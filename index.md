---
layout: index
jumbotron: false
title: Gallery
navbar: true
navbar-order: 0
---

{% assign series_sorted = site.film | sort: 'order' %}

{% for gallery in series_sorted %}
  {% if gallery.role != "feature" %}
    {% continue %}
  {% endif %}

<div class="film index">
  <h4>{{ gallery.title }}</h4>
  {{ gallery.content }}
</div>
{% endfor %}