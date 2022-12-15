---
layout: post
subtitle: Tsukiji Outer Market
order: 0
n_photos: 25
key_photo: 2
title: Tsukiji Outer Market
camera: Olympus XA, Mamiya 645 Pro TL
lens: Zuiko 35mm f/2.8, Mamiya Sekor C 80mm f/2.8 N
film: Ilford FP4+ 125, Fuji Reala 100, Ilford Delta 400
format: 120, 135
---

{% for i in ( 1..2 ) %}
  {% include series-photo.html i=i %}
{% endfor %}

Now I can have text between partial galleries

{% include gallery.html row_height=200 n_start=3 n_photos=7 path=page.path %}

more text!

{% include gallery.html row_height=200 n_start=10 n_photos=2 path=page.path %}

{% include series-photo.html i=12 %}

{% include gallery.html row_height=200 n_start=13 n_photos=6 path=page.path %}

{% for i in ( 19..page.n_photos ) %}
  {% include series-photo.html i=i %}
{% endfor %}

