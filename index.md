---
layout: index
jumbotron: false
title: Gallery
navbar: true
navbar-order: 0
---

{% assign series_sorted = site.film | sort: 'order' %}

<div class="film">
{% for gallery in series_sorted %}
  {% if gallery.role != "feature" %}
    {% continue %}
  {% endif %}

  <h3>{{ gallery.title }}</h3>
  {{ gallery.content }}
{% endfor %}
</div>