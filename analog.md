---
layout: analog
---

<div class="series-thumb-container">
{% for series in site.analog %}
  <div class="img-box series-thumb">
    <a href="{{ series.url }}">
      <img src="/assets/img/analog/{{ series.key }}/{{ series.key_photo }}.jpg">
      <div class="caption">
        {{ series.title }}
      </div>
    </a>
  </div>
</div>
{% endfor %}