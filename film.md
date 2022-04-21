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
  cj:
    caption: Coastal Jams
    camera: Yashica-Mat EM
    lens: Yashinon 80mm f/3.5
    stock: Kodak Ektachrome (EPZ Expired '84)
    path: film/selected/coastaljams.jpg
---

<!-- selected photos -->
<div class="gallery">

{%- include photo.html photo=page.photos.gg -%}
{%- include photo.html photo=page.photos.mb -%}
{%- include photo.html photo=page.photos.cj psize="small" -%}

{% assign series_sorted = site.film | sort: "order" %}
{% for series in series_sorted %}
  <div class="img-box gallery-piece small">
    <a href="{{ series.url }}">
      <img src="/assets/img/film/{{ series.key }}/{{ series.key_photo }}_tn.jpg"/>
      <div class="caption">
        {{ series.title }}
      </div>
    </a>
  </div>
{% endfor %}
</div>