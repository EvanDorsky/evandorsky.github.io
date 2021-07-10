#!/usr/bin/env python

import sys, os
from pprint import pprint
from subprocess import call
from multiprocessing.pool import Pool
import exifread

def thumb(path, height):
  dirpath = os.path.dirname(path)
  filename = os.path.basename(path)
  path_tn = os.path.join(dirpath, '..',
    filename.split('.')[0]+'_tn.jpg')
  print('path tn: %s' % path_tn)
  call(['convert', path, '-resize', str(height), path_tn])
  return path_tn

def gray(path):
  dirname = os.path.dirname(path)
  filename = os.path.basename(path)
  call(['convert',
    path,
    '-grayscale',
    'rec709luma',
    os.path.join(dirname,
      filename.split('.')[0]+'_gray.jpg')
    ])

def process(dirname_filename):
  dirname, filename = dirname_filename
  if 'original' in dirname and '.jpg' in filename:
    path = os.path.join(dirname, filename)
    if 'film' in dirname:
      with open(path, 'rb') as img_f:
        exiftags = exifread.process_file(img_f)
        timestamp = str(exiftags['Image DateTime']).replace(':', '-')
        os.rename(path, os.path.join(dirname, '%s.jpg' % timestamp))

    # make the thumbnail
    path_tn = thumb(path, 500)
    # make grayscale versions of the thumbnail and the original
    # map(gray, [path, path_tn])

def process_files(path):
  for dirname, dirnames, filenames in os.walk(path):
    filenames_by_dir = ((dirname, fname) for fname in filenames)
    p.map(process, filenames_by_dir)

if __name__ == '__main__':
  p = Pool(32)
  process_files('assets/img/about')
