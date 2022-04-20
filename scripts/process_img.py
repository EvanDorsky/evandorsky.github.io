#!/usr/bin/env python

import sys, os
from pprint import pprint
from subprocess import call
from multiprocessing.pool import Pool
import functools

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

def process_files(path, dim):
  for dirpath, dirnames, filenames in os.walk(path):
    filenames_by_dir = ((dirpath, fname) for fname in filenames)
    p.map(functools.partial(process, dim=dim), filenames_by_dir)

if __name__ == '__main__':
  p = Pool(32)
  process_files('assets/img/about', 500)

  process_files('assets/img/film', '1000x1000')
