---
layout: page
jumbotron: false
title: Photography
thumb: /assets/img/film/selected/goldengate.jpg

navbar: true

photos:
  gg:
    caption: Hawk Hill
    camera: Mamiya 645 Pro TL
    lens: Sekor C 80mm f/2.8
    stock: Fujifilm Provia 100
    path: film/selected/goldengate.jpg
  mb:
    caption: Monte Bello Open Space Preserve
    camera: Yashica-Mat EM
    lens: Yashinon 80mm f/3.5
    stock: Kodak Ektar 100
    path: film/selected/montebello.jpg
---

<!-- selected photos -->
{%- include photo.html photo=page.photos.gg -%}
{%- include photo.html photo=page.photos.mb -%}

<div class="series-thumb-container">
{% assign series_sorted = site.film | sort: "order" %}
{% for series in series_sorted %}
  <div class="img-box series-thumb">
    <a href="{{ series.url }}">
      <img src="/assets/img/film/{{ series.key }}/{{ series.key_photo }}_tn.jpg"/>
      <div class="caption">
        {{ series.title }}
      </div>
    </a>
  </div>
{% endfor %}
</div>