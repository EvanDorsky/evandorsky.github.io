---
layout: page
jumbotron: true
wrapper_type: wide
title: Gallery
navbar: true
navbar-order: 0

n_photos: 58
---

<!-- selected photos -->
<div class="fj-gallery">

{% for i in ( 1.. page.n_photos ) %}
  <div class="fj-gallery-item">
  {% assign num_str = i | prepend: '00' | slice: -2, 2 %}
    <img src="/assets/img/film/gallery/{{ num_str }}.jpg"/>
  </div>
{% endfor %}
</div>