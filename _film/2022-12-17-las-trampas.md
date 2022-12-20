---
layout: post
order: 0
n_photos: 6
key_photo: 2
title: Las Trampas
subtitle: Las Trampas Wilderness Regional Preserve
camera: Yashica-Mat EM
lens: Yashinon 80mm f/3.5
film: Kodak TMAX 400
format: 120
---

{% assign photo_index = 1 %}

{% for i in ( 1..page.n_photos ) %}
  {% include series-photo.html i=i %}
{% endfor %}