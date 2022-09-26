---
layout: page
wrapper_type: wide
jumbotron: false
title: Photojournal
thumb: /assets/img/film/selected/goldengate.jpg

navbar: true
navbar-order: 1
row_height: 250

---

<!-- selected photos -->
<div class="fj-gallery">

<script type="text/javascript">
  window.galleryRowHeight = {{ page.row_height }}
</script>

{% assign series_sorted = site.film | reverse %}
{% for series in series_sorted %}
  {% if series.role == 'feature' %}
    {% continue %}
  {% endif %}

  <div class="fj-gallery-item">
    <a href="{{ series.url }}">
  {% assign num_str = series.key_photo | prepend: '00' | slice: -2, 2 %}

  {% assign pathsplit = series.path | split: '/' %}
  {% assign name_ext = pathsplit[-1] %}
  {% assign namesplit = name_ext | split: '.' %}
  {% assign series_name = namesplit[0] %}
      <img src="/assets/img/film/{{ series_name }}/{{ num_str }}.webp"/>
      <div class="caption">
        <div class="title">
          {{ series.title }}
        </div>
        <div class="date">
          {{ series.date | date: "%b %Y" }}
        </div>
      </div>
    </a>
  </div>
{% endfor %}
</div>