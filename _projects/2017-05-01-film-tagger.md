---
layout: project
title: Analog Metadata
type: physical
status: complete
order: 1
key_photo: 4
n_photos: 4
captions: [
  "GPS module next to the window, trying to get a lock",
  "GPS module",
  "Arduino board",
  "Board and camera"
]
---

A digital image file contains more than the image itself. It also has *metadata* – data about data – often including the date and time the image was made and a description of the camera and lens. If the camera is equipped with GPS, the location where the image was made is often included too.

Film photographs come with no such metadata. In fact, there is no abstract data at all. The storage medium of the image *is* the image itself, in physical space, in the gelatin emulsion on the film base.

Of course 2023 we digitize these images with scanners, and those image files have metadata, but the metadata only tells us about the scanner and when the film was scanned. Often the scanners don't even embed the date and time properly, or the images come back in reverse order. This metadata is no use for organizing a library of film scans.

I want to bridge the digital and the analog. What if my analog cameras could record the same metadata as digital cameras? Then, when I got film scans back, I could mate the scans and metadata into a first-class digital image file. Easy to integrate into my photo library, my external memory.

Analog cameras were already prepared to bridge the divide. Nearly every camera has a flash [sync port](https://en.wikipedia.org/wiki/Prontor-Compur) or a [hot shoe](https://en.wikipedia.org/wiki/Hot_shoe) – standard interfaces – that makes electrical contact when the shutter is fired. This would be the trigger to record metadata.

I built a device: an Arduino connected to
- a real-time clock (RTC) module,
- a GPS module,
- and an SD card reader.

Essentially I built the metadata-creating apparatus of a digital camera. I wired the device to the flash sync port of my camera and wrote code to log the [date and time, GPS location] to the SD card every time the shutter fired.

With a little more effort this device could be reduced to the size of the GPS module – or the SD card, were the GPS omitted – or even smaller, with flash memory and a custom interface replacing the SD card.

A little button, popped onto an analog camera, bringing it into the digital world.