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
  {% assign num_str = i | prepend: '00' | slice: -2, 2 %}
  {% capture img_src %}film/gallery/{{ num_str }}.jpg{% endcapture %}

  {% include photo.html src=img_src %}
{% endfor %}
</div>