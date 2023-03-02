---
role: feature
layout: gallery
order: 1
n_photos: 5
key_photo: 1
title: Architecture
row_height: 800
---

{% assign photo_index = 1 %}

{% include gallery.html row_height=500 row_tol=0.5 n_start=1 n_photos=page.n_photos path=page.path %}
