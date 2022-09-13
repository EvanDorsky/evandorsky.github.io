---
layout: page-wide
jumbotron: true
wrapper_type: wide
title: Gallery
navbar: true
navbar-order: 0
---

{% assign series_sorted = site.film | sort: 'order' %}

<div class="feature-gallery-container">
{% for series in series_sorted %}
  {% unless series.role == 'feature' and series.layout == 'gallery' %}
    {% continue %}
  {% endunless %}
  {% if series.title == "Selected Work" %}
    {% continue %}
  {% endif %}

  <div class="gallery-card {{ series.layout }}">
    <a href="{{ series.url }}">
  {% assign num_str = series.key_photo | prepend: '00' | slice: -2, 2 %}

  {% assign pathsplit = series.path | split: '/' %}
  {% assign name_ext = pathsplit[-1] %}
  {% assign namesplit = name_ext | split: '.' %}
  {% assign series_name = namesplit[0] %}
      <div class="title">
        {{ series.title }}
      </div>
      <img src="/assets/img/film/{{ series_name }}/{{ num_str }}.jpg"/>
    </a>
  </div>
{% endfor %}
</div>

{% for series in series_sorted %}
  {% if series.role != 'feature' or series.layout != 'series' %}
    {% continue %}
  {% endif %}

  <div class="gallery-card {{ series.layout }}">
    <a href="{{ series.url }}">
  {% assign num_str = series.key_photo | prepend: '00' | slice: -2, 2 %}

  {% assign pathsplit = series.path | split: '/' %}
  {% assign name_ext = pathsplit[-1] %}
  {% assign namesplit = name_ext | split: '.' %}
  {% assign series_name = namesplit[0] %}
      <div class="title">
        {{ series.title }}
      </div>
      <img src="/assets/img/film/{{ series_name }}/{{ num_str }}.jpg"/>
    </a>
  </div>
{% endfor %}

<h2 id="gallery">Selected Work</h2>
{% include gallery.html row_height=page.row_height n_photos=page.n_photos path=page.path %}

{% for gallery in site.film %}
  {% if gallery.title == "Selected Work" %}
    {% include gallery.html row_height=gallery.row_height n_photos=gallery.n_photos path=gallery.path %}
  {% endif %}
{% endfor %}