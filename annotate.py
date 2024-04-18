#!/usr/bin/env python3

import warnings
warnings.filterwarnings("ignore")

import shutil
from imageai.Classification import ImageClassification
from imageai.Detection import ObjectDetection
import os
import time
from datetime import datetime
import json
from pprint import pprint
from subprocess import call, check_output
import subprocess

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
def classify(impath, model, result_count=10, debug=False):
  if debug:
    print("====================")
    print(model["name"])
    print(model["desc"])
    start = time.time()

  predictions, probabilities = model["model"].classifyImage(impath, result_count)
  if debug:
    elapsed = time.time() - start
    print("elapsed time: %f msec" % (elapsed*1000))
    for eachPrediction, eachProbability in zip(predictions, probabilities):
      print(eachPrediction , " : " , eachProbability)

def det_counts(detections):
  det_counts = {}
  for det in detections:
    if det["name"] not in det_counts:
      det_counts[det["name"]] = 0

    det_counts[det["name"]] += 1

  return det_counts

@img_process
def get_exifstamp(path):
  res = check_output(["exiftool", "-DateTimeOriginal", path], text=True)
  datetime_str = res.split(': ')[1].strip()
  dt_obj = datetime.strptime(datetime_str, '%Y:%m:%d %H:%M:%S')
  return int(dt_obj.timestamp())

@img_process
def detect(impath, model, result_count=10, debug=False):
  if debug:
    print("====================")
    print(model["name"])
    print(model["desc"])
  start = time.time()

  outpath = None
  if debug:
    outpath = impath+"_"+model["name"]+".jpg"
  detections = model["model"].detectObjectsFromImage(input_image=impath, output_image_path=outpath, minimum_percentage_probability=40)

  if debug:
    for det in detections:
      print(det["name"] , " : ", det["percentage_probability"], " : ", det["box_points"] )
      print("--------------------------------")

  return det_counts(detections)

def init_classifiers():
  classifiers = {}

  for f in os.listdir("classifiers"):
    if f == ".DS_Store": continue
    fname_split = f.split('-')
    classifiers[fname_split[0]] = {
      "path": os.path.join(os.getcwd(), "classifiers", f),
      "name": fname_split[0]
    }

  for mname in classifiers:
    m = ImageClassification()
    if "mobilenet" in mname:
      m.setModelTypeAsMobileNetV2()
      classifiers[mname]["desc"] = "fastest prediction time and moderate accuracy"
    elif "resnet" in mname:
      m.setModelTypeAsResNet50()
      classifiers[mname]["desc"] = "fast prediction time and high accuracy"
    elif "inception" in mname:
      m.setModelTypeAsInceptionV3()
      classifiers[mname]["desc"] = "slow prediction time and higher accuracy"
    elif "densenet" in mname:
      m.setModelTypeAsDenseNet121()
      classifiers[mname]["desc"] = "slower prediction time and highest accuracy"

    m.setModelPath(classifiers[mname]["path"])
    m.loadModel()

    classifiers[mname]["model"] = m

  return classifiers

def init_detectors():
  detectors = {}

  for f in os.listdir("detectors"):
    if f == ".DS_Store": continue
    detectors[f] = {
      "path": os.path.join(os.getcwd(), "detectors", f),
      "name": f
    }

  for mname in detectors:
    d = ObjectDetection()
    if "retinanet" in mname:
      d.setModelTypeAsRetinaNet()
      detectors[mname]["desc"] = "high performance and accuracy, with longer detection time"
    elif "tiny-yolov3" in mname:
      d.setModelTypeAsTinyYOLOv3()
      detectors[mname]["desc"] = "moderate performance and accuracy, with a moderate detection time"
    elif "yolov3" in mname:
      d.setModelTypeAsYOLOv3()
      detectors[mname]["desc"] = "optimized for speed and moderate performance, with fast detection time"

    d.setModelPath(detectors[mname]["path"])
    d.loadModel()

    detectors[mname]["model"] = d

  return detectors

def read():
  pass

def generate():
  debug = False

  detectors = init_detectors()
  detector = detectors["yolov3.pt"]

  data_path = "_data/2024-04-16-japan-test"
  imgs_path = "assets/img/posts/2024-04-16-japan-test/original"
  all_dets = {}
  for f in sorted(os.listdir(imgs_path)):
    impath = os.path.join(imgs_path, f)
    print(impath)
    timestamp = get_exifstamp(impath)
    if not timestamp:
      continue

    dets = detect(impath, detector)

    shutil.move(impath,
      os.path.join(imgs_path, str(timestamp)+os.path.splitext(f)[1])
    )
    metadata = {
      "img": impath,
      "detections": dets
    }

    if timestamp in all_dets:
      print("Error: exists")
    all_dets[timestamp] = metadata

  with open(os.path.join(data_path, "metadata.json"), "w") as f:
    json.dump(all_dets, f, indent=2, sort_keys=True)

if __name__ == '__main__':
  generate()