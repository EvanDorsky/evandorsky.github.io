#!/usr/bin/env python3

import sys, os
from pprint import pprint
from subprocess import call
from multiprocessing.pool import Pool
import functools
import argparse
import os
import shutil

series_template = """---
layout: series
order: 0
n_photos: 
key_photo: 
title: 
camera: 
lens: 
film: 
format: 
---
"""

IM_EXTS = [
  '.jpg'
]

def is_im(path):
  return os.path.isfile(path) and os.path.splitext(path)[-1] in IM_EXTS

def create_webp(im, webp):
  return call(['magick', im, '-resize', '1000x1000', '-quality', '90', '-define', 'webp:method=6', webp])

def run_process_img(args):
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
  # 1. if the original folder doesn't exist, create it and move all the images there
    orig_path = os.path.join(im_dir, 'original')
    if not os.path.exists(orig_path):
      os.mkdir(orig_path)

      ims = sorted(os.listdir(im_dir))
      for im in ims:
        im_path = os.path.join(im_dir, im)
        if is_im(im_path):
          shutil.copy(im_path, os.path.join(orig_path, im))
          os.remove(im_path)

    originals = sorted(os.listdir(orig_path))
    # 2. for each image in the original folder...
    for fname in originals:
      im_orig_path = os.path.join(orig_path, fname)
      if is_im(im_orig_path):
        # 1. check for the presence of a corresponding webp
        webp_name = os.path.splitext(fname)[0] + '.webp'
        webp_path = os.path.join(im_dir, webp_name)

        make_webp = False
        if args.force:
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
          create_webp(im_orig_path, webp_path)


def run_series(args):
  os.mkdir('assets/img/film/%s' % args.name)

  with open('_film/%s.md' % args.name, 'w') as f:
    f.write(series_template)

if __name__ == '__main__':
  parser = argparse.ArgumentParser()

  modes = {
    'process-img': {
      'func': run_process_img,
      'args': {
        '--force': {
          'action': 'store_true'
        }
      }
    },
    'series': {
      'func': run_series,
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