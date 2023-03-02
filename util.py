#!/usr/bin/env python3

import sys, os
from pprint import pprint
from subprocess import call, run
from multiprocessing.pool import Pool
import functools
import argparse
import os
import shutil
import yaml
from collections import OrderedDict
import json

import sqlite3 as sl
import stripe
stripe.api_key = "sk_test_51MdQnKB1vb1395e1LOXH5pkDD0EOtuNoMlbxLc6xN8ufMGPM6seyG0XLGYFgR7KkF6Ty4HuhKhnHiGxNDP9q6b8600Hpn09sFZ"

def valid_path(path):
  try:
    os.makedirs(path)
  except FileExistsError:
    pass

  return path

series_info = OrderedDict([
  ("layout", "post"),
  ("order", 0),
  ("n_photos", ""),
  ("key_photo", 1),
  ("title", ""),
  ("subtitle", "")
])

IM_EXTS = [
  '.jpg'
]

def exif_text_to_dict(text):
  exif = {}
  for line in text.split('\n'):
    for i, char in enumerate(line):
      if char == ':':
        break
    exif[line[:i].strip()] = line[i+1:].strip()

  return exif

def load_photo_meta(path):
  res = run(['exiftool', path], capture_output=True, text=True)
  return exif_text_to_dict(res.stdout)

# get NLP-formatted metadata from exif data
def get_info_dict(exif):
  try:
    desc = exif['Description']
    keywords = exif['Keywords']
  except KeyError:
    return {}

  desc_split = list(map(str.strip, str(desc).split('|')))
  keywords_split = list(map(str.strip, str(keywords).split(',')))

  # look for "Caption" (field name in Lightroom) -- metadata that the Stripe integration uses
  # this is the primary key for the product in the Products database
  photo_id = ''
  if '..' in desc_split[0]:
    photo_id = desc_split[0].split('..')[0]

  try:
    stock_speed = desc_split[2].split('..')[0]
  except IndexError:
    stock_speed = ''
  stock_speed = stock_speed.split(' ')

  stock = ' '.join(stock_speed[:-1])
  speed = stock_speed[-1]

  # pick the film format out of the keywords
  # this is where NLP shoves the film format, it's not ideal
  # but hopefully this works

  # "35mm" is the default because digital photos won't have a film format,
  # and my digital photos are all 3x2, at least for now
  # see how resilient it is?
  film_format = '35mm'
  for fformat in ['6x6', '645', '35mm']:
    if fformat in keywords:
      film_format = fformat
      break
  # another hack – "lrk:" prefix to pass unbounded info along instead of relying on empty fields
  category = ''
  for keyword in keywords_split:
    if 'lrk:' in keyword:
      kw_parts = keyword[4:].split(':')
      if kw_parts[0] == 'category':
        category = kw_parts[1]

  # just fill empty keys so we can build a partial dict
  keys =['Title', 'Camera Model Name', 'Lens Make', 'Lens']
  for key in keys:
    if key not in exif:
      exif[key] = ''

  res = {
    'id': photo_id,
    'title': exif['Title'],
    'camera': exif['Camera Model Name'],
    'lens': exif['Lens Make'] + ' ' + exif['Lens'],
    'lens_make': exif['Lens Make'],
    'stock': stock,
    'speed': speed,
    'category': category,
    'format': film_format
  }

  return res

def is_im(path):
  return os.path.isfile(path) and os.path.splitext(path)[-1] in IM_EXTS

def create_webp(im, webp, dim):
  return call(['magick', im, '-resize', '%ix%i' % (dim, dim), '-quality', '90', '-define', 'webp:method=6', webp])

def get_series_path(name):
  series_folders = ['_film', '_portfolio']
  for folder in series_folders:
    test_path = os.path.join(folder, name+".md")

    if os.path.isfile(test_path):
      return test_path

  print("Could not find markdown file for series: %s" % name)
  print("Exiting")
  exit()

def run_process_img(args):
  print("Generating web images...")
  if type(args) == argparse.Namespace:
    args = vars(args)
  im_dirs = []
  for dirpath, dirnames, filenames in os.walk('./assets/img/film'):
    for fname in filenames:
      # disqualify the original folders themselves...
      if os.path.split(dirpath)[-1] == 'original':
        # but if a folder contains an original folder but no images,
        # it counts as a folder containing images
        im_dirs += [os.path.split(dirpath)[0]]
        break

      if os.path.splitext(fname)[-1] in IM_EXTS:
        im_dirs += [dirpath]
        break

  # for each folder containing images...
  for im_dir in im_dirs:
    series_name = os.path.split(im_dir)[-1]

    series_file = get_series_path(series_name)

    with open(series_file, "r") as f:
      docs = yaml.safe_load_all(f)
      im_dim = args["dim"]
      for doc in docs:
        try:
          if doc is not None and 'im_dim' in doc:
            im_dim = doc['im_dim']
          # this is kind of lazy, but we know that the first doc will be valid
          # and the text after the doc separator won't be, so just break after
          # yielding the first one
          break
        except yaml.scanner.ScannerError as e:
          print('Warning: Could not parse series document as YAML: %s' % e)
        except Exception as e:
          raise

  # 1. if the "original" folder doesn't exist, create it and move all the images there
    orig_path = os.path.join(im_dir, 'original')
    if not os.path.exists(orig_path):
      os.mkdir(orig_path)

      ims = sorted(os.listdir(im_dir))
      for im in ims:
        im_out_path = os.path.join(im_dir, im)
        if is_im(im_out_path):
          shutil.copy(im_out_path, os.path.join(orig_path, im))
          os.remove(im_out_path)

    originals = sorted(os.listdir(orig_path))
    # 2. for each image in the "original" folder...
    for fname in originals:
      im_orig_path = os.path.join(orig_path, fname)
      if is_im(im_orig_path):
        # 1. check for the presence of a corresponding webp
        webp_name = os.path.splitext(fname)[0] + '.webp'
        webp_path = os.path.join(im_dir, webp_name)

        make_webp = False
        if args["force"]:
          # allow us to force webp creation
          make_webp = True
        else:
          if not os.path.exists(webp_path):
            make_webp = True
          else:
            # 2. check timestamps
            orig_time = os.path.getmtime(im_orig_path)
            webp_time = os.path.getmtime(webp_path)

            if orig_time > webp_time: # if the original is newer than the webp
              make_webp = True

        # 3. if the webp is stale, or missing, update it
        if make_webp:
          create_webp(im_orig_path, webp_path, im_dim)

def info_tostr(info):
  sep = "---\n"
  frontmatter = sep
  for key in info:
    frontmatter += "%s: %s\n" % (key, info[key])

  frontmatter += sep
  return frontmatter

def get_valid_series_name(name):
  series = sorted(os.listdir('assets/img/film/'))
  candidates = []
  for s in series:
    if name in s:
      candidates += [s]

  guess = None
  if len(candidates) == 1:
    guess = candidates[0]
  else:
    # check for a perfect match if there are multiple candidates
    for c in candidates:
      if name == c:
        guess = c

  if guess is not None:
    print('Series: %s (input: %s)' % (guess, name))

    return guess

  print('multiple possible series:')
  pprint(candidates)
  print('exiting')
  exit()

def run_series(args):
  if args.action != 'create':
    args.name = get_valid_series_name(args.name)

  im_out_path = 'assets/img/film/%s' % args.name
  md_path = '_film/%s.md' % args.name

  input_path = os.path.expanduser(args.input_path)
  input_files = os.listdir(input_path)
  # if we're just refreshing and there are no input images,
  # don't delete the existing images
  if len(input_files) == 0 and args.action == "refresh":
    pass
  elif args.action in ["remove", "refresh"]:
    try:
      shutil.rmtree(im_out_path)
      if args.action == "remove":
        os.remove(md_path)
    except Exception as e:
      print('Failed to remove series: %s' % e)
    if args.action == "remove":
      return

  try:
    os.mkdir(im_out_path)
  except FileExistsError:
    pass
  except Exception as e:
    raise

  # move image files into the new series path
  for photo in input_files:
    res_path = os.path.join(im_out_path, photo)
    if os.path.exists(res_path):
      os.remove(res_path)
    shutil.move(os.path.join(input_path, photo), im_out_path)

  if args.action == "create":
    # fill series info
    series_info["n_photos"] = len(input_files)
    frontmatter = info_tostr(series_info)

    with open(md_path, 'w') as f:
      f.write(frontmatter)
      f.write('\n')
      f.write('{% assign photo_index = 1 %}')
      f.write('\n')
      f.write('\n')
      for i in range(series_info["n_photos"]):
        f.write('{% include series-photo.html %}')
        f.write('\n')

  if args.action != "read":
    # run process-img, since there are new images to process now
    run_process_img({"dim": 1500, "force": False})

  # then collect the metadata
  series_meta = []
  if args.action in ["create", "refresh", "read"]:
    jpg_path = os.path.join(im_out_path, 'original')
    contents = os.listdir(jpg_path)
    for dirpath, dirs, files in os.walk(jpg_path):
      for file in sorted(files):
        meta = load_photo_meta(os.path.join(dirpath, file))
        series_meta += [get_info_dict(meta)]

    # create metadata summary
    meta_summary = {}

    meta_summary = {
      key: sorted(list(set([el[key] for el in series_meta]))) for key in series_meta[0]
    }

    # create series summary strings
    # lens summary
    meta_summary['lens_dict'] = {make: [] for make in meta_summary['lens_make']}
    for lens in meta_summary['lens']:
      for make in meta_summary['lens_make']:
        if make in lens:
          make_len = len(make)
          meta_summary['lens_dict'][make] += [lens[make_len+1:]]
          break

    lenses = meta_summary['lens_dict']
    make_summaries = []
    for make in lenses:
      make_summaries += [make+' '+', '.join(lenses[make])]
    lens_summary = ', '.join(make_summaries)

    meta_summary['lens_summary'] = lens_summary
    meta_summary['camera_summary'] = ', '.join(meta_summary['camera'])
    meta_summary['stock_summary'] = ', '.join(meta_summary['stock'])

  # metadata now lives in series_meta

  for i, photo in enumerate(series_meta):
    filename = "%02i.jpg" % (i+1)
    if args.action == "read":
      pprint(os.path.join(dirpath, filename))
      pprint(photo)
    else:
      print('make the json data')
      # create json data files
      json_name = os.path.splitext(filename)[0] + '.json'
      print('put it here: %s' % os.path.join(valid_path('_data/%s' % args.name), json_name))
      pprint(photo)
      with open(os.path.join(valid_path('_data/%s' % args.name), json_name), 'w') as f:
        json.dump(photo, f)

      with open('_data/%s/series.json' % args.name, 'w') as f:
        json.dump(meta_summary, f)


def get_prefixes(labels):
  n_labels = len(labels)
  for i in range(n_labels):
    for j in range(i+1, n_labels):
      pfix = prefix(labels[i], labels[j])
      print("%i and %i share: %s" % (i, j, pfix))

def prefix(a, b):
  for i in range(len(a)):
    if a[i] != b[i]:
      break

  return a[:i]

### sqlite

def dict_factory(cursor, row):
  fields = [column[0] for column in cursor.description]
  return {key: value for key, value in zip(fields, row)}

def run_productize(args):
  args.name = get_valid_series_name(args.name)

  # load photo metadata
  data_dir = os.path.join(valid_path('_data/%s' % args.name))

  filenames = sorted([el for el in os.listdir(data_dir) if 'series' not in el])

  photos = []
  for fname in filenames:
    with open(os.path.join(data_dir, fname), 'r') as f:
      photo = json.load(f)
      photos.append(photo)

  con = sl.connect('store/test.db')
  with con:
    con.row_factory = dict_factory
    c = con.cursor()

    for p in photos:
      # check if this id already exists in the database
      res = c.execute("SELECT id from Products WHERE id == (?)", (p["id"],))
      # if it doesn't exist, add to the database
      if res.fetchone() is None:
        c.execute("""
            INSERT INTO Products (id, name, camera, lens, stock, ar, category, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          """, (p['id'], p['title'], p['camera'], p['lens'], p['stock'], p['format'], p['category'], 1))
        print("Added photo id: %s" % p['id'])

# database schema: corresponding key in metadata dict, or default value

# "id": id
# "name": title
# "desc": 
# "location": 
# "date": 
# "camera": camera
# "lens": lens
# "stock": stock
# "active": 1
# "image": 
# "ar": format

if __name__ == '__main__':
  parser = argparse.ArgumentParser()

  modes = {
    'process-img': {
      'func': run_process_img,
      'args': {
        '--force': {
          'action': 'store_true'
        },
        '--dim': {
          'type': int,
          'default': 1500
        }
      }
    },
    'series': {
      'func': run_series,
      'args': {
        'name': {},
        '--input-path': {
          'default': '~/Film/Outbox'
        },
        '--action': {
          'type': str,
          'default': 'create'
        }
      }
    },
    'productize': {
      'func': run_productize,
      'args': {
        'name': {}
      }
    }
  }
  subparsers = parser.add_subparsers(dest='mode')
  subparsers.required=True

  for mode_name in modes:
    mode = modes[mode_name]
    subparser = subparsers.add_parser(mode_name)

    if 'args' in mode:
      for arg_name in mode['args']:
        arg = mode['args'][arg_name]
        subparser.add_argument(arg_name, **arg)

  args = parser.parse_args()

  # any setup
  p = Pool(32)

  # run the selected mode
  modes[args.mode]['func'](args)



'''
def run_process_img(args):
  process_imgs('assets/img/about', 500)
  process_imgs('assets/img/film', '1000x1000')

# create a thumbnail in the parent directory
def thumb_jpg(path, dim, suffix=False):
  dirpath = os.path.dirname(path)
  filename = os.path.basename(path)
  path_tn = os.path.join(dirpath, '..',
    filename.split('.')[0]+'_tn.jpg')
  call(['convert', path, '-resize', str(dim), path_tn])
  return path_tn

def process(dirpath_filename, dim):
  dirpath, filename = dirpath_filename
  if 'original' in dirpath:
    path = os.path.join(dirpath, filename)

    thumb_jpg(path, dim)

def process_imgs(path, dim):
  for dirpath, dirnames, filenames in os.walk(path):
    filenames_by_dir = ((dirpath, fname) for fname in filenames)
    p.map(functools.partial(process, dim=dim), filenames_by_dir)
'''