---
layout: page
jumbotron: false
title: Film Photography
thumb: /assets/img/film/alignment/29_tn.jpg
---

<div class="img-box series-thumb">
  <img src="/assets/img/film/selected/goldengate.jpg"/>
</div>

<div class="img-box series-thumb">
  <img src="/assets/img/film/selected/montebello.jpg"/>
</div>

<div class="series-thumb-container">
{% assign series_sorted = site.film | sort: "order" %}
{% for series in series_sorted %}
  <div class="img-box series-thumb">
    <a href="{{ series.url }}">
      <img src="/assets/img/film/{{ series.key }}/{{ series.key_photo }}_tn.jpg"/>
      <div class="caption">
        {{ series.title }}
      </div>
    </a>
  </div>
{% endfor %}
</div>