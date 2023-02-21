---
role: hidden
layout: selected
order: 3
n_photos: 14
key_photo: 4
title: Bangalore
subtitle: Bangalore
---

{% assign photo_index = 1 %}

{% include gallery.html row_height=300 row_tol=0.3 n_start=1 n_photos=page.n_photos path=page.path %}