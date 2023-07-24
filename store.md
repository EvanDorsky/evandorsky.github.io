---
layout: default
jumbotron: false
title: Store
thumb: /assets/img/posts/2022-12-28-street/03.webp

navbar: false
row_height: 200

---

{% assign series_sorted = site.portfolio | sort: 'order' %}

All prints are 300 dpi inkjet prints with Precision Colors CLI-42 dye ink on Canon Photo Paper Pro Luster.

<!-- this is just an empty div to get the correct first-child starting point -->
<div></div>
{% for gallery in series_sorted %}
  {% if gallery.role != "feature" %}
    {% continue %}
  {% endif %}

<div class="article-container index">
  <h4>{{ gallery.title }}</h4>
  {{ gallery.content }}
</div>
{% endfor %}

<script type="text/javascript">
  window.galleryRowHeight = 250
  window.galleryRowTol = 0.3
</script>