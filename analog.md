---
layout: page
jumbotron: false
---

## Analog Photography

<div class="series-thumb-container">
{% assign series_sorted = site.analog | sort: "order" %}
{% for series in series_sorted %}
  <div class="img-box series-thumb">
    <a href="{{ series.url }}">
      <img src="/assets/img/analog/{{ series.key }}/{{ series.key_photo }}_tn.jpg">
      <div class="caption">
        {{ series.title }}
      </div>
    </a>
  </div>
{% endfor %}
</div>