---
layout: page
jumbotron: true
wrapper_type: wide
title: Home
navbar: true
navbar-order: 0
---

{% assign series_sorted = site.film | reverse %}
{% for series in series_sorted %}
  {% if series.layout != 'gallery' %}
    {% continue %}
  {% endif %}

  <div class="gallery-card">
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