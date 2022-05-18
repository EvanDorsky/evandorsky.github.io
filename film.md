---
layout: page
wrapper_type: wide
jumbotron: false
title: Photography
thumb: /assets/img/film/selected/goldengate.jpg

navbar: true

photos:
  ggbridge:
    caption: Hawk Hill
    camera: Mamiya 645 Pro TL
    lens: Sekor C 80mm f/2.8
    stock: Fujifilm Provia 100
    path: film/selected/goldengate.jpg
  montebello:
    caption: Monte Bello Open Space Preserve
    camera: Yashica-Mat EM
    lens: Yashinon 80mm f/3.5
    stock: Kodak Ektar 100
    path: film/selected/montebello.jpg
  coastjams:
    caption: Coastal Jams
    camera: Yashica-Mat EM
    lens: Yashinon 80mm f/3.5
    stock: Kodak Ektachrome 100X Pro
    path: film/selected/coastaljams.jpg
  purplehouse:
    caption: Mission District
    camera: Mamiya 645 Pro TL
    lens: Sekor C 80mm f/2.8
    stock: Kodak Ektar 100
    path: film/selected/house.jpg
  bernie:
    caption: Market Street
    camera: Mamiya 645 Pro TL
    lens: Sekor C 80mm f/2.8
    stock: Kodak Portra 160
    path: film/selected/bernie.jpg
  chef:
    caption: Mission Bernal
    camera: Mamiya 645 Pro TL
    lens: Sekor C 80mm f/2.8
    stock: Kodak TMAX 400 @ 3200
    path: film/selected/chef.jpg
  flamingo:
    caption: Chinatown
    camera: Mamiya 645 Pro TL
    lens: Sekor C 80mm f/2.8
    stock: Kodak TMAX 400 @ 3200
    path: film/selected/flamingo.jpg
  pacifica:
    caption: Pacifica
    camera: Yashica-Mat EM
    lens: Yashinon 80mm f/3.5
    stock: Kodak Ektachrome 100X Pro
    path: film/selected/pacifica.jpg
  cruise:
    caption: Cruise
    camera: Yashica-Mat EM
    lens: Yashinon 80mm f/3.5
    stock: Kodak Gold 200
    path: film/2022-05-07-cruise/05.jpg
---

<!-- selected photos -->
<div class="fj-gallery">

{%- include photo.html photo=page.photos.ggbridge -%}
{%- include photo.html photo=page.photos.montebello psize="medium" -%}
{%- include photo.html photo=page.photos.coastjams psize="medium" -%}
{%- include photo.html photo=page.photos.cruise psize="medium" -%}

{% assign series_sorted = site.film | sort: "order" %}
{% for series in series_sorted %}
  <div class="fj-gallery-item">
    <a href="{{ series.url }}">
  {% assign num_str = series.key_photo | prepend: '00' | slice: -2, 2 %}

  {% assign pathsplit = series.path | split: '/' %}
  {% assign name_ext = pathsplit[-1] %}
  {% assign namesplit = name_ext | split: '.' %}
  {% assign series_name = namesplit[0] %}
      <img src="/assets/img/film/{{ series_name }}/{{ num_str }}.jpg"/>
      <!-- <div class="caption">
        {{ series.title }}
      </div> -->
    </a>
  </div>
{% endfor %}
</div>