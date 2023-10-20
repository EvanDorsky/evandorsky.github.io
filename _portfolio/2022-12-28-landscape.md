---
role: feature
layout: selected
order: 3
n_photos: 4
key_photo: 1
title: Landscape
---

{% assign photo_index = 1 %}

{% include gallery.html row_height=600 row_tol=0.3 n_start=1 n_photos=page.n_photos path=page.path %}
