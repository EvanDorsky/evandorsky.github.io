---
layout: index
jumbotron: false
title: Gallery
navbar: true
navbar-order: 0
---

{% assign series_sorted = site.portfolio | sort: 'order' %}

<div class="film index">
  <div class="selected-list">
  {% for gallery in series_sorted %}
    {% if gallery.role != "selected" %}
      {% continue %}
    {% endif %}

    {% include selected-preview.html post=gallery %}
  {% endfor %}
  </div>
</div>

{% for gallery in series_sorted %}
  {% if gallery.role != "feature" %}
    {% continue %}
  {% endif %}

<div class="film index">
  <h4>{{ gallery.title }}</h4>
  {{ gallery.content }}
</div>
{% endfor %}