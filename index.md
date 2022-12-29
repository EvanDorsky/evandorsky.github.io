---
layout: page-wide
jumbotron: true
wrapper_type: wide
title: Gallery
navbar: true
navbar-order: 0
---

{% assign series_sorted = site.film | sort: 'order' %}

{% for gallery in site.film %}
  {% if gallery.role %}
    {% include gallery.html row_height=gallery.row_height n_photos=gallery.n_photos path=gallery.path %}
  {% endif %}
{% endfor %}