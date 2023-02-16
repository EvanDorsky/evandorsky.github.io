---
layout: page
jumbotron: false
title: Music

navbar: true
navbar-order: 2
---

{% assign shows = site.shows | reverse %}

<!-- first, check if there are any upcoming shows -->
{% assign now = "now" | date: "%s" %}
{% assign upcoming_shows = false %}
{% for show in site.shows %}
  {% assign showdate = show.date | date: "%s" %}
  {% if showdate > now %}
    {% assign upcoming_shows = true %}
    {% break %}
  {% endif %}
{% endfor %}

{% if upcoming_shows %}
<div class="show-label upcoming">Upcoming Concerts</div>
<div class="music-shows">
{% endif %}

{% assign last_happened = false %}
{% assign last_year     = "2023" %}
{% for show in shows %}
  {% assign showdate = show.date | date: "%s" %}

  {% assign current_happened = true %}
  {% if showdate > now %}
    {% assign current_happened = false %}
  {% endif %}

  {% if current_happened != last_happened %}
{% if upcoming_shows %}
</div>
{% endif %}
<div class="show-label past">Past Concerts</div>
<div class="show-label year">{{ current_year }}</div>
<div class="music-shows">
  {% endif %}

  {% assign current_year = show.date | date: "%Y" %}
  {% if last_year != current_year %}
</div>
<div class="show-label year">{{ current_year }}</div>
<div class="music-shows">
  {% endif %}
  {% include music-show.html show=show %}
  {% assign last_year = show.date | date: "%Y" %}

  {% assign last_happened = true %}
  {% if showdate > now %}
    {% assign last_happened = false %}
  {% endif %}
{% endfor %}

</div>