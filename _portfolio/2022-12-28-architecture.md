---
role: feature
layout: gallery
order: 2
n_photos: 5
key_photo: 1
title: Architecture
---

{% assign photo_index = 1 %}

{% include gallery.html row_height=450 row_tol=0.4 n_start=1 n_photos=page.n_photos path=page.path %}