#!/usr/bin/env python3

import typing
import sys, os
from pprint import pprint
from subprocess import call, check_output
from multiprocessing.pool import Pool
import functools
import argparse
import shutil
from collections import OrderedDict
import json

import unicodedata

from datetime import date, datetime
import time

import sqlite3 as sl

# external dependencies
from bs4 import BeautifulSoup
import yaml
import requests
from html import parser

# import stripe
# stripe.api_key = "sk_test_51Mgj2BEhyRPhN5qgaRf5BPVYAMFjyNGvBXK8l5LAsuAH2l10rjbw6XXYXxc01zvFlQGkBfcaraOrfp19mOnRw6d600hPBFQDaP"

def valid_path(path):
  try:
    os.makedirs(path)
  except FileExistsError:
    pass

  return path

PROCESS_IMG_DIR = './assets/img/posts'

series_info = OrderedDict([
  ("layout", "post"),
  ("order", 0),
  ("n_photos", ""),
  ("key_photo", 1),
  ("title", ""),
  ("subtitle", "")
])

# Do I look like I know what a jay-peg is?
# https://www.youtube.com/watch?v=QwucZK1BCj4
IM_EXTS = [
  ".jpg",
  ".jpeg",
  ".JPG",
  ".JPEG"
]

def is_valid_impath(path):
  p, ext = os.path.splitext(path)

  # maybe not great to call os.path.exists on EVERY path
  return ext in IM_EXTS and os.path.exists(path)

# check the first argument (supposed to be path to image)
# and make sure it's a path to an image
def img_process(func):
  def wrapper(*args, **kwargs):
    if is_valid_impath(args[0]):
      return func(*args, **kwargs)
    else:
      return None

  return wrapper

@img_process
def get_exifstamp(path):
  res = check_output(["exiftool", "-DateTimeOriginal", path], text=True)
  datetime_str = res.split(': ')[1].strip()
  dt_obj = datetime.strptime(datetime_str, '%Y:%m:%d %H:%M:%S')
  return int(dt_obj.timestamp())

def exif_text_to_dict(text):
  exif = {}
  for line in text.split(b'\n'):
    line = line.decode()
    for i, char in enumerate(line):
      if char == ':':
        break
    exif[line[:i].strip()] = line[i+1:].strip()

  return exif

def load_info_dict(path):
  exif = load_photo_meta(path)

  return get_info_dict(exif)

def load_photo_meta(path):
  res = check_output(['exiftool', path])
  return exif_text_to_dict(res)

def norm_japanese(s):
  s = s.replace("ō", "o")
  s = s.replace("Ō", "O")

  return s

# get NLP-formatted metadata from exif data
def get_info_dict(exif):
  desc = ''
  if 'Description' in exif:
    desc = exif['Description']
  desc_split = list(map(str.strip, str(desc).split('|')))

  keywords = ''
  if 'Keywords' in exif:
    keywords = exif['Keywords']
  keywords_split = list(map(str.strip, str(keywords).split(',')))

  keywords_hier = []
  if 'Hierarchical Subject' in exif:
    keywords_hier = exif['Hierarchical Subject']
    # hierarchical keywords are split by commas, then pipes
    keywords_hier = [[inner.strip() for inner in str(outer).split('|')] for outer in str(keywords_hier).split(',')]

  # pull location out of hierarchical metadata
  running_max_len = 0
  location = []
  for el in keywords_hier:
    if "Location" in el:
      el_len = len(el)
      if el_len > running_max_len:
        running_max_len = el_len
        location = el

  location = [norm_japanese(s) for s in location]

  loc_dict = {}
  if location:
    loc_dict = {
      "country": location[1],
      "region": location[2],
      "prefecture": location[3],
      "city": "",
      "neighborhood": "",
      "subneighborhood": ""
    }
    if len(location) >= 5:
      loc_dict["city"] = location[4]

    if len(location) >= 6:
      loc_dict["neighborhood"] = location[5]

    if len(location) >= 7:
      loc_dict["subneighborhood"] = location[6]

  '''

  Osaka, Osaka Prefecture, Kansai Region, Japan
  San Francisco, San Francisco County, California, United States

  '''

  # look for "Caption" (field name in Lightroom) -- metadata that the Stripe integration uses
  # this is the primary key for the product in the Products database
  caption = ''
  if '..' in desc_split[0]:
    caption = desc_split[0].split('..')[0]

  try:
    stock_speed = desc_split[2].split('..')[0]
  except IndexError:
    stock_speed = ''
  stock_speed = stock_speed.split(' ')

  stock = ' '.join(stock_speed[:-1])
  try:
    speed = stock_speed[-2]
  except IndexError:
    speed = ''

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

  # just fill empty keys so we can build a partial dict
  keys =['Title', 'Camera Model Name', 'Lens Make', 'Lens']
  for key in keys:
    if key not in exif:
      exif[key] = ''

  res = {
    'id': caption,
    'title': exif['Title'],
    'caption': caption,
    'camera': exif['Camera Model Name'],
    'lens': exif['Lens Make'] + ' ' + exif['Lens'],
    'lens_specs': exif['Lens'],
    'lens_make': exif['Lens Make'],
    'stock': stock,
    'speed': speed,
    'category': '',
    'format': film_format,
    'keywords': keywords_hier,
    'location': loc_dict
  }

  # another hack - "lrk:" prefix to pass unbounded info along instead of relying on empty fields
  for keyword in keywords_split:
    if 'lrk:' in keyword:
      kw_parts = keyword[4:].split(':')
      key = kw_parts[0]

      res[key] = kw_parts[1]

  return res

def printables():
  url = 'https://api.printables.com/graphql/'

  headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "en",
    "apollographql-client-version": "v2.62.0",
    "Client-Uid": "ab256d74-436b-4cf7-bc58-227642fd8e30",
    "Content-Type": "application/json",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.4 Safari/605.1.15"
  }

  with open('assets/util/printables_v2.graphql') as f:
    query = f.read()
  payload = {
    "operationName": "PrintsAndMakes",
    "variables": {
        "userId": "977475",
        "ordering": "-likes_count",
        "premium": False,
        "limit": 5
    },
    "query": query
  }

  response = requests.post(url, headers=headers, json=payload)

  if response.ok:
    data = response.json()
  else:
    print("Request failed with status code:", response.status_code)
    pprint(response.content)

  feed = []
  for i in data["data"]["prints"]:
    isoformat = "%Y-%m-%dT%H:%M:%S.%f%z"
    pub_date = datetime.strptime(i["datePublished"], isoformat)

    feed += [{
      "type": "printable",
      "title": i["name"],
      "date": int(datetime.timestamp(pub_date)),
      "description": "",
      "img": "https://media.printables.com/%s" % i["stls"][0]["filePreviewPath"],
      "link": "https://www.printables.com/model/%s-%s" % (i["id"], i["slug"])
    }]

  return feed

def rss_factory(url, blogname):
  def rss_to_feeddict():
    try:
      res = requests.get(url)
    except Exception as e:
      print("Failed to get feed %s: %s" % (url, e))
      return

    rss_soup = BeautifulSoup(res.text, 'xml')
    items = rss_soup.find_all('item')

    feed = []
    for i in items:
      dformat = "%a, %d %b %Y %H:%M:%S %Z"
      pub_date = datetime.strptime(i.find('pubDate').text, dformat)

      feed.append({
          "type": blogname,
          "title": i.find('title').text,
          "date": int(datetime.timestamp(pub_date)),
          "description": i.find('description').text,
          "img": i.find('enclosure').get('url'),
          "link": i.find('link').text
      })

    return feed

  return rss_to_feeddict


def observable():
  try:
    res = requests.get("https://observablehq.com/@dorskyee")
  except Exception as e:
    print("Failed to get page: %s" % e)

  soup = BeautifulSoup(res.text, 'html.parser')

  data = json.loads(soup.find(id="__NEXT_DATA__").string)

  feed = []
  for i in data["props"]["pageProps"]["fallback"]["/documents/@dorskyee?page=1\u0026sort=published\u0026direction=desc"]["results"]:
    if i["collection_count"] < 1:
      continue

    isoformat = "%Y-%m-%dT%H:%M:%S.%f%z"
    pub_date = datetime.strptime(i["update_time"], isoformat)

    author = i["creator"]["login"]

    feed += [{
      "type": "observable",
      "title": i["title"],
      "date": int(datetime.timestamp(pub_date)),
      "description": "",
      "img": "https://static.observableusercontent.com/thumbnail/%s.jpg" % i["thumbnail"],
      "link": "https://observablehq.com/@%s/%s" % (author, i["slug"])
    }]

  return feed

def notion():
  pprint("Notion start")
  databases = {
    "shared": "18ed5a7b7ba3410692566f811fe69509"
  }

  feed = []

  notion_secret = os.getenv("NOTION_API_KEY")
  pprint("Notion secret: %s" % notion_secret)
  headers = {
    'Notion-Version': '2022-06-28',
    'Authorization': "Bearer %s" % notion_secret,
    "Content-Type": "application/json"
  }
  dbfilt = {
    "filter": {
      "and": []
    }
  }

  base_url = "https://api.notion.com/v1/databases/"
  for dbname in databases:
    page = databases[dbname]
    try:
      res = requests.post(base_url+page+"/query", headers=headers, data=json.dumps(dbfilt))
    except Exception as e:
      print("Failed to get feed %s: %s" % (url, e))
      return []

    res_data = res.json()
    pprint("Notion response len: %i" % len(res.text))

    pages = res_data["results"]
    pprint("Notion got results from res_data")
    for page in pages:
      isoformat = "%Y-%m-%dT%H:%M:%S.%f%z"
      pub_date = datetime.strptime(page["last_edited_time"], isoformat)

      page_name = "".join(page["properties"]["Name"]["title"][0]["plain_text"])

      feed += [{
        "type": "notion",
        "title": page_name,
        "date": int(datetime.timestamp(pub_date)),
        "description": "",
        "img": "",
        "link": page["public_url"],
        "key": page_name
      }]

  return feed

def instagram():
  user = "dorskyee"

  feed = []
  url = "https://www.instagram.com/%s/?" % user

  retries_left = 3
  success = False
  while not success and retries_left > 0:
    try:
      res = requests.get(url)
    except Exception as e:
      print("BOOPS")
      print("instagram request failed: %s" % e)
      print("Retries remaining: %i" % retries_left)
      retries_left-=1
      print("Waiting 5 seconds, then trying again...")
      time.sleep(5)
      continue

    content = res.content
    print("Instagram response content len: %s" % len(content))
    soup = BeautifulSoup(content, 'html.parser')

    data = None
    for script_tag in soup.find_all('script'):
      print("Instagram script tag len: %s" % len(script_tag.string))
      try:
        data = json.loads(script_tag.string)
        if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict) and "articleBody" in data[0]:
          print("Chose script tag")
          break
      except json.JSONDecodeError:
        print("Failed to load json")
        continue

    if data == None:
      print("Retries remaining: %i" % retries_left)
      retries_left-=1
      print("Waiting 5 seconds, then trying again...")
      time.sleep(5)
    else:
      success = True

  if not success:
    raise

  postidx = 0
  for post in data:
    dateformat = "%Y-%m-%dT%H:%M:%S%z"

    pub_date = datetime.strptime(post["dateCreated"], dateformat)
    desc = post["articleBody"]

    feed += [{
      "type": "instagram",
      "title": "Post",
      "date": int(datetime.timestamp(pub_date)),
      "description": desc.split('\n')[0],
      "description_full": desc,
      "img": post["image"][0]["url"],
      "link": post["url"],
      "key": "insta%i" % postidx
    }]

    postidx+=1

  return feed

def github():
  user = "EvanDorsky"

  feed = []
  url = "https://api.github.com/users/%s/repos" % user

  try:
    res = requests.get(url)
    pass
  except Exception as e:
    print("github request failed: %s" % e)

  data = res.json()

  postidx = 0
  for i in data:
    name = i["name"]

    dateformat = "%Y-%m-%dT%H:%M:%S%z"
    pub_date = datetime.strptime(i["pushed_at"], dateformat)

    feed += [{
      "type": "github",
      "title": name,
      "date": int(datetime.timestamp(pub_date)),
      "description": i["description"],
      "img": i["owner"]["avatar_url"],
      "link": i["html_url"],
      "key": i["full_name"]
    }]

    postidx+=1

  return feed

def run_get_feed(args):
  feeds = {
    "luckybox": {
      "title": "Lucky Box",
      "factory": rss_factory("https://luckybox.substack.com/feed", "luckybox")
    },
    "mariner": {
      "title": "The Mariner",
      "factory": rss_factory("https://mariner.substack.com/feed", "mariner")
    },
    "printable": {
      "title": "Objects",
      "factory": printables
    },
    "observable": {
      "title": "Interactive Notebooks",
      "factory": observable
    },
    "notion": {
      "title": "Living Docs",
      "factory": notion
    },
    # "instagram": {
    #   "title": "Instagram",
    #   "factory": instagram
    # },
    "github": {
      "title": "GitHub",
      "factory": github
    }
  }

  posts = []
  for feedname in feeds:
    try:
      feed = feeds[feedname]["factory"]()

      posts += feed
      
      print("loaded %s" % feedname)
    except Exception as e:
      print("Failed to load feed %s: %s" % (feedname, e))

  posts.sort(key=lambda p: p["date"], reverse=True)

  try:
    with open("_data/feeds/posts.json", 'w') as f:
      json.dump(posts, f, indent=4, ensure_ascii=False)

    print("wrote combined posts")
  except Exception as e:
    print("Failed to save combined posts: %s" % e)

def is_im(path):
  return os.path.isfile(path) and os.path.splitext(path)[-1] in IM_EXTS

def create_webp(im, webp, dim):
  # return call(['magick', im, '-resize', '%ix%i' % (dim, dim), '-quality', '90', '-define', 'webp:method=6', webp])
  return call(['magick', im, '-quality', '90', webp])

def get_series_path(name):
  series_folders = ['_photojournal', '_portfolio', '_projects', '_photowork']
  for folder in series_folders:
    test_path = os.path.join(folder, name+".md")

    if os.path.isfile(test_path):
      return test_path

  print("Could not find markdown file for series: %s" % name)

def run_process_img(args):
  print("Generating web images...")
  if type(args) == argparse.Namespace:
    args = vars(args)
  im_dirs = []
  for dirpath, dirnames, filenames in os.walk(args['dir']):
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
    print("Checking series: %s..." % series_name)

    series_file = get_series_path(series_name)
    im_dim = args['dim']

    if series_file:
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
    else:
      print("Warning: series file could not be found, proceeding anyway")

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
          print("Creating new webp: %s..." % webp_path)
          create_webp(im_orig_path, webp_path, im_dim)

def info_tostr(info):
  sep = "---\n"
  frontmatter = sep
  for key in info:
    frontmatter += "%s: %s\n" % (key, info[key])

  frontmatter += sep
  return frontmatter

def get_valid_series_name(name):
  series = sorted(os.listdir('assets/img/posts/'))
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

JPEG_EXTS = [
".JPG",
".JPEG",
".jpg",
".jpeg"
]

def get_input_files(path):
  all_files = os.listdir(path)
  files = [f for f in all_files if os.path.splitext(f)[1] in JPEG_EXTS]

  return files

def run_update(args):
  input_path = os.path.expanduser(args.input_path)
  input_files = get_input_files(input_path)

  series = {}
  for file in input_files:
    meta = load_info_dict(os.path.join(input_path, file))
    if 'series' in meta:
      s = meta['series']
      series_path = os.path.join(input_path, get_valid_series_name(s))
      if series_path not in series:
        series[series_path] = []
      series[series_path] += [file]

  print("series")
  print(series)

def run_series(args):
  if args.action != 'create':
    args.name = get_valid_series_name(args.name)

  im_out_path = 'assets/img/posts/%s' % args.name
  md_path = '_photojournal/%s.md' % args.name

  input_path = os.path.expanduser(args.input_path)
  input_files = get_input_files(input_path)
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

    # rename the images based on their exif timestamp, if requested
    if args.exif_rename:
      timestamp = get_exifstamp(res_path)
      shutil.move(res_path,
        os.path.join(im_out_path, str(timestamp)+os.path.splitext(res_path)[1])
      )

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
    run_process_img({"dim": args.resolution, "force": False, "dir": PROCESS_IMG_DIR})

  # then collect the metadata
  series_meta = []
  if args.action in ["create", "refresh", "read"]:
    print("Recreating metadata...")
    jpg_path = os.path.join(im_out_path, 'original')
    contents = os.listdir(jpg_path)
    for dirpath, dirs, files in os.walk(jpg_path):
      for file in sorted(files):
        print(os.path.join(dirpath, file))
        meta = load_photo_meta(os.path.join(dirpath, file))
        info_dict = get_info_dict(meta)
        info_dict["filename"] = os.path.splitext(file)[0]

        series_meta += [info_dict]

    # create metadata summary
    meta_summary = {}

    meta_valid = False
    try:
      meta_summary = {
        key: sorted(list(set([el[key] for el in series_meta if isinstance(el[key], typing.Hashable)]))) for key in series_meta[0]
      }
      print("metadata summary")
      pprint(meta_summary)
      if meta_summary != {}:
        if 'lens_make' not in meta_summary:
          meta_valid = False
        else:
          meta_valid = True
    except Exception as e:
      print("Metadata summary creation failed: %s" % e)

    if meta_valid:
      print("metadata is valid")
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
      # create json data files
      json_name = os.path.splitext(filename)[0] + '.json'
      with open(os.path.join(valid_path('_data/%s' % args.name), json_name), 'w') as f:
        json.dump(photo, f)

      with open('_data/%s/series.json' % args.name, 'w') as f:
        json.dump(meta_summary, f, indent=4)

  # also write the same data all together into one file,
  # but as a dictionary keyed by filename
  series_meta_dict = {}
  for photo in series_meta:
    series_meta_dict[photo['filename']] = photo

  with open('_data/%s/photo_info.json' % args.name, 'w') as f:
    json.dump(series_meta_dict, f, indent=4, sort_keys=True)


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

      photo_fname = os.path.splitext(fname)[0] + '.webp'
      # construct image url
      # p_image = "https://www.evandors.ky/assets/img/posts/2022-12-28-street/01.webp"
      photo['image'] = "https://www.evandors.ky/assets/img/posts/%s" % (os.path.join(args.name, photo_fname))

      photos.append(photo)

  con = sl.connect('store/store.db')
  with con:
    con.row_factory = dict_factory
    c = con.cursor()

    for p in photos:
      # check if this id already exists in the database
      # if it doesn't exist, add to the database
      res = c.execute("SELECT id from Products WHERE id == (?)", (p["id"],))
      if res.fetchone() is None:
        if not args.dryrun:
          c.execute("""
              INSERT INTO Products (id, name, camera, lens, stock, format, category, image, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (p['id'], p['title'], p['camera'], p['lens'], p['stock'], p['format'], p['category'], p['image'], 1))
          print("Added photo id: %s" % p['id'])

# database schema: corresponding key in metadata dict, or default value

# "id": id
# "name": title
# "desc": 
# "location": 
# "category": category
# "date": 
# "camera": camera
# "lens": lens
# "stock": stock
# "active": 1
# "image": 
# "format": format

def run_upload(args):
  con = sl.connect('store/store.db')
  with con:
    con.row_factory = dict_factory
    c = con.cursor()

    rows = c.execute("SELECT * from Products")
    for product in rows.fetchall():
      res = c.execute("SELECT * from Prices WHERE formats LIKE '%' || (?) || '%'", (product['format'],))
      prices = res.fetchall()

      if not args.dryrun:
        product_exists = True
        try:
          stripe.Product.retrieve(product['id'])
        except stripe.error.InvalidRequestError:
          product_exists = False
        if not product_exists:
          stripe.Product.create(
            id=product['id'],
            name=product['name'],
            active=bool(product['active']),
            description=product['desc'],
            images=[product['image']],
            shippable=True,
            metadata=product
          )
          print("Created product: %s" % product['id'])
        else:
          stripe.Product.modify(product['id'],
            name=product['name'],
            active=bool(product['active']),
            description=product['desc'],
            images=[product['image']],
            shippable=True,
            metadata=product
          )
          print("Updated product: %s" % product['id'])

        stripe_prices = stripe.Price.list(product=product['id'])
        uploaded_prices = {}
        for sp in stripe_prices:
          uploaded_prices[int(sp['metadata']['id'])] = sp

        for price in prices:
          # for each price, check if it's already in stripe
          # if it's not, create it
          if int(price['id']) not in uploaded_prices:
            sprice = stripe.Price.create(
              product=product['id'],
              active=bool(price['active']),
              nickname=price['nickname'],
              unit_amount=int(price['unit_amount'] * 100),
              currency=price['currency'],
              metadata=price
            )
            print("Created price: $%.2f (id: %i)" % (price['unit_amount'], price['id']))
          else:
            # otherwise, update it
            sprice = stripe.Price.modify(uploaded_prices[price['id']]['id'],
              active=bool(price['active']),
              nickname=price['nickname'],
              metadata=price
            )
            print("Updated price: $%.2f (id: %i)" % (price['unit_amount'], price['id']))
          # then, check if a payment link exists. if it doesn't, create one
          paymentlink = stripe.PaymentLink.create(
            line_items = [{
              "price": sprice['id'],
              "quantity": 1
            }],
            metadata=price,
            custom_text={
              "shipping_address": {
                "message": price['nickname']
              }
            },
            shipping_address_collection={
              "allowed_countries": ["US"]
            }
          )
          print("%s: %s" % (product['id'], price['nickname']))
          print('---------')
          print("%s: %s" % (paymentlink['id'], paymentlink['url']))

def run_photochain(args):
  path = args.path
  dirpath, _ = os.path.split(path)

  with open(path, 'r') as f:
    meta = json.load(f)

  photos_by_obj = {}
  for photo in meta:
    el = meta[photo]
    dets = el['detections']
    for obj in dets:
      if obj not in photos_by_obj:
        photos_by_obj[obj] = []

      photos_by_obj[obj] += [photo]

  with open(os.path.join(dirpath, "metadata_by_obj.json"), "w") as f:
    json.dump(photos_by_obj, f, indent=2, sort_keys=True)

if __name__ == '__main__':
  parser = argparse.ArgumentParser()

  modes = {
    'process-img': {
      'func': run_process_img,
      'args': {
        '--dir': {
          'default': './assets/img/posts'
        },
        '--force': {
          'action': 'store_true'
        },
        '--dim': {
          'type': int,
          'default': 1500
        }
      }
    },
    'feed': {
      'func': run_get_feed,
      'args': {
      }
    },
    'series': {
      'func': run_series,
      'args': {
        'name': {},
        '--input-path': {
          'default': '~/Library/Mobile Documents/com~apple~CloudDocs/Outbox'
        },
        '--action': {
          'type': str,
          'default': 'create'
        },
        '--resolution': {
          'type': int,
          'default': 1500
        },
        '--exif-rename': {
          'action': 'store_true'
        }
      }
    },
    'update': {
      'func': run_update,
      'args': {
        '--input-path': {
          'default': '~/Library/Mobile Documents/com~apple~CloudDocs/Outbox'
        }
      }
    },
    'productize': {
      'func': run_productize,
      'args': {
        'name': {},
        '--dryrun': {
          'action': 'store_true'
        }
      }
    },
    'upload': {
      'func': run_upload,
      'args': {
        '--dryrun': {
          'action': 'store_true'
        }
      }
    },
    'photo-chain': {
      'func': run_photochain,
      'args': {
        'path': {}
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

  # run the selected mode
  modes[args.mode]['func'](args)



'''
def run_process_img(args):
  process_imgs('assets/img/about', 500)
  process_imgs('assets/img/posts', '1000x1000')

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