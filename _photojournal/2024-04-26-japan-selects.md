---
layout: selected
order: 0
n_photos: 9
key_photo: 1
title: Japan
location: Japan
---

{% assign photo_index = 1 %}

{% include gallery.html row_height=300 row_tol=0.3 n_start=1 n_photos=page.n_photos path=page.path %}