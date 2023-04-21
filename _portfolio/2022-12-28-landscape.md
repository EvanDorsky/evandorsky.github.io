---
role: feature
layout: gallery
order: 2
n_photos: 4
key_photo: 2
title: Landscape
row_height: 800
---

{% assign photo_index = 1 %}

{% include gallery.html row_height=500 n_start=1 n_photos=page.n_photos path=page.path %}
