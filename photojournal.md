---
layout: page-wide
jumbotron: false
title: Photojournal
thumb: /assets/img/film/selected/goldengate.jpg

navbar: true
navbar-order: 1
row_height: 350

---

<!-- selected photos -->
<div class="fj-gallery">

<script type="text/javascript">
  window.galleryRowHeight = {{ page.row_height }}
</script>

{% assign series_sorted = site.film | reverse %}
{% for series in series_sorted %}
  {% if series.role %}
    {% continue %}
  {% endif %}

  {% include post-preview.html post=series %}

{% endfor %}
</div>