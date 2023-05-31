---
role: selected
layout: selected
order: 1
n_photos: 14
key_photo: 12
title: Tokyo
subtitle: Tokyo
---

{% assign photo_index = 1 %}

{% include gallery.html id="tokyo" row_height=450 row_tol=0.4 n_start=1 n_photos=page.n_photos path=page.path %}