#!/usr/bin/env python3

import sys, os
from pprint import pprint
from subprocess import call
from multiprocessing.pool import Pool
import functools
import argparse
import os

series_template = """---
layout: series
order: 0
n_photos: 
key_photo: 
title:  
---
"""

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

# modes

def run_process_img(args):
  process_imgs('assets/img/about', 500)
  process_imgs('assets/img/film', '1000x1000')

def run_series(args):
  os.mkdir('assets/img/film/%s' % args.name)

  with open('_film/%s.md' % args.name, 'w') as f:
    f.write(series_template)

if __name__ == '__main__':
  parser = argparse.ArgumentParser()

  modes = {
    'process-img': {
      'func': run_process_img
    },
    'series': {
      'func': run_series,
      'args': ['name']
    }
  }
  subparsers = parser.add_subparsers(dest='mode')
  subparsers.required=True

  for mode_name in modes:
    mode = modes[mode_name]
    subparser = subparsers.add_parser(mode_name)

    if 'args' in mode:
      for arg in mode['args']:
        subparser.add_argument(arg)

  args = parser.parse_args()

  # any setup
  p = Pool(32)

  # run the selected mode
  modes[args.mode]['func'](args)