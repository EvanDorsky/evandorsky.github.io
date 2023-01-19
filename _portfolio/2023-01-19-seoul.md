---
role: selected
layout: selected
order: 0
n_photos: 13
key_photo: 2
title: Seoul
subtitle: Seoul
---

{% assign photo_index = 1 %}

{% include gallery.html row_height=532 row_tol=0.3 n_start=1 n_photos=page.n_photos path=page.path %}