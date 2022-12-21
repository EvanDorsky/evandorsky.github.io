---
layout: post
order: 0
n_photos: 6
key_photo: 2
title: Las Trampas
subtitle: Las Trampas Wilderness Regional Preserve
camera: Yashica-Mat EM
lens: Yashinon 80mm f/3.5
film: Kodak TMAX 400
format: 120
---

{% assign photo_index = 1 %}

Like many wilderness preserves surrounding the San Francisco Bay, the Las Trampas Wilderness Regional Preserve is cattle pasture.

(Note the sign on the gate.)

{% include series-photo.html %}

The Spanish settlers in the neighboring valley named this area "Las Trampas" ("the traps") [after the hunting practices of the native people who lived here](https://www.ebparks.org/sites/default/files/lastrampas_the_story.pdf). They drove large prey animals into canyons out of which they could not escape – traps. In a way, the current use of the land does not differ much.

{% for i in ( 2..page.n_photos ) %}
  {% include series-photo.html %}
{% endfor %}