---
# role: feature
layout: selected
order: 3
n_photos: 9
key_photo: 1
title: Architecture
---

{% assign photo_index = 1 %}

{% include gallery.html row_height=400 row_tol=0.4 n_start=1 n_photos=page.n_photos path=page.path %}