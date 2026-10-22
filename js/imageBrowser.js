(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

window.galleriesHandledElsewhere = true

window. finishSequence = "[{\"id\":\"1710320471\",\"reason\":\"NONE\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"Gyoenmae\"}},{\"id\":\"1710321440\",\"reason\":\"Backpack\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"\"}},{\"id\":\"1709370520\",\"reason\":\"Backpack\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"\"}},{\"id\":\"1710317416\",\"reason\":\"Backpack\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"\"}},{\"id\":\"1710321662\",\"reason\":\"Backpack\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"\"}},{\"id\":\"1709284320\",\"reason\":\"Truck\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Akihabara\",\"subneighborhood\":\"\"}},{\"id\":\"1709629155\",\"reason\":\"Car\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Roppongi\",\"subneighborhood\":\"\"}},{\"id\":\"1710494222\",\"reason\":\"Car\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Kanagawa\",\"city\":\"Yokohama\",\"neighborhood\":\"\",\"subneighborhood\":\"\"}},{\"id\":\"1709370092\",\"reason\":\"Truck\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"\"}},{\"id\":\"1710406861\",\"reason\":\"Truck\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"\"}},{\"id\":\"1709289286\",\"reason\":\"Truck\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Akihabara\",\"subneighborhood\":\"\"}},{\"id\":\"1710321689\",\"reason\":\"Bicycle\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"\"}},{\"id\":\"1710837234\",\"reason\":\"Bicycle\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Koenji\",\"subneighborhood\":\"\"}},{\"id\":\"1710490913\",\"reason\":\"Bicycle\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"Gyoenmae\"}},{\"id\":\"1709629295\",\"reason\":\"Bicycle\",\"location\":{\"country\":\"Japan\",\"region\":\"Kansai\",\"prefecture\":\"Osaka\",\"city\":\"Osaka\",\"neighborhood\":\"Namba\",\"subneighborhood\":\"\"}},{\"id\":\"1710493409\",\"reason\":\"Bicycle\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Monzen-Nakacho\",\"subneighborhood\":\"\"}},{\"id\":\"1710061609\",\"reason\":\"Pottedplant\",\"location\":{\"country\":\"Japan\",\"region\":\"Kyushu\",\"prefecture\":\"Fukuoka\",\"city\":\"Fukuoka\",\"neighborhood\":\"\",\"subneighborhood\":\"\"}},{\"id\":\"1709374077\",\"reason\":\"Pottedplant\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"\"}},{\"id\":\"1710406941\",\"reason\":\"Pottedplant\",\"location\":{\"country\":\"Japan\",\"region\":\"Kanto\",\"prefecture\":\"Tokyo\",\"city\":\"Tokyo\",\"neighborhood\":\"Shinjuku\",\"subneighborhood\":\"Gyoenmae\"}}]"

window.japanRegions = {
  "Hokkaido": [
    "Hokkai"
  ],
  "Tohoku": [
    "Aomori",
    "Akita",
    "Fukushima",
    "Iwate",
    "Miyagi",
    "Yamagata"
  ],
  "Kanto": [
    "Chiba",
    "Gunma",
    "Ibaraki",
    "Kanagawa",
    "Saitama",
    "Tochigi",
    "Tokyo"
  ],
  "Chubu": [
    "Aichi",
    "Fukui",
    "Gifu",
    "Ishikawa",
    "Nagano",
    "Niigata",
    "Shizuoka",
    "Toyama",
    "Yamanashi"
  ],
  "Kansai": [
    "Hyogo",
    "Kyoto",
    "Mie",
    "Nara",
    "Osaka",
    "Shiga",
    "Wakayama"
  ],
  "Chugoku": [
    "Hiroshima",
    "Okayama",
    "Shimane",
    "Tottori",
    "Yamaguchi"
  ],
  "Shikoku": [
    "Ehime",
    "Kagawa",
    "Kochi",
    "Tokushima"
  ],
  "Kyushu": [
    "Fukuoka",
    "Kagoshima",
    "Kumamoto",
    "Miyazaki",
    "Nagasaki",
    "Oita",
    "Saga",
    // (sorry, Okinawa got excluded)
    // "Okinawa"
  ]
}

function randomEl(arr) {
  // console.log('arr')
  // console.log(arr)
  if (arr.length === 0) return undefined;

  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

function catButtonClick(e) {
  let el = d3.select(e.target)
  let cat = el.text().trim()

  for (let imgname in window.photo_metadata) {
    let img = window.photo_metadata[imgname]
    let dets = img.detections

    if (!(cat in dets)) {
      // console.log(img)
    }
  }
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// id="id{{ d[0] }}" 
//         {% for det in d[1].detections %}
//         "det_{{ det[0] | replace: ' ', '_' }}"="{{ det[1] }}"
//         {% endfor %}


window.galleryHistory = []

function galleryHistoryGetFromEnd(offset=0) {
  let len = window.galleryHistory.length

  return window.galleryHistory[len-1-offset]
}

function galleryHistoryIncludes(id) {
  return window.galleryHistory.map(i => i.id).includes(id)
}

function metadataGetLocation(metadata) {
  return keywordsGetLocation(metadata.keywords)
}

function keywordsGetLocation(keywords) {
  let candidates = []
  keywords.forEach(keyArr => {
    if (keyArr[0] == "Location") {
      candidates.push(keyArr)
    }
  })

  let idx = candidates.reduce((longestIndex, currentArray, currentIndex, array) => {
    return currentArray.length > array[longestIndex].length ? currentIndex : longestIndex
  }, 0)

  let location = candidates[idx]

  // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
  let locDict = {
    "country": location[1],
    "region": location[2].normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    "prefecture": location[3].normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
    "city": "",
    "neighborhood": "",
    "subneighborhood": ""
  }
  if (location.length >= 5) {
    locDict.city = location[4].normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }
  if (location.length >= 6) {
    locDict.neighborhood = location[5].normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }
  if (location.length >= 7) {
    locDict.subneighborhood = location[6].normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  return locDict
}

function displayImg(imgID, containerSel) {
  // console.log('display image')
  // console.log(imgID)
  // console.log('containerSel')
  // console.log(containerSel)
  let imgContainer = d3.select(containerSel)
  let img = imgContainer.select("img")
  // console.log('img')
  // console.log(img)
  // let lastimgContainer = d3.select(".last-photo")
  // let lastimg = lastimgContainer.select("img")

  // change the detection attributes
  var attributes = imgContainer.node().attributes;
  for (let i = attributes.length - 1; i >= 0; i--) {
    if (attributes[i].name.startsWith('det_')) {
      imgContainer.attr(attributes[i].name, null);
    }
  }

  let dets = window.photo_metadata[imgID].detections
  for (let det in dets) {
    imgContainer.attr(`det_${det.replace(' ', '_')}`, dets[det])
  }

  let img_src = img.attr("src")
  let src_split = img_src.split("/")
  let new_src = src_split.slice(0, -1).join("/")+"/"+imgID+".webp"

  // change the id
  imgContainer.attr("id", `id${imgID}`)
  // change the img src
  img.attr("src", new_src)
}

function displayLocation(imgID, reason=null) {
  // update the location
  let loc = metadataGetLocation(window.photo_info[imgID])
  if (reason) {
    reason = reason.charAt(0).toUpperCase() + reason.substring(1)
  }
  d3.select(".reason").text(`${reason}`)
  d3.select(".region").text(`${loc.region}`)
  d3.select(".prefecture").text(`${loc.prefecture}`)
  let neighborhood_text = loc.neighborhood

  if (loc.subneighborhood) {
    neighborhood_text += ' ' + loc.subneighborhood
  }

  d3.select(".neighborhood").text(`${neighborhood_text}`)

  let city_text = loc.city

  mapDeselectAll()
  mapSelectRegion(mapRegion(loc.prefecture))
  mapSelectKen(loc.prefecture)

  if (reason != null) {
    window.galleryHistory.push({
      id: imgID,
      reason: reason,
      location: loc
    })
  }

  // if (neighborhood_text) {
  //   city_text = ', '+city_text
  // }
  // d3.select(".city").text(city_text)
}

function mapRegion(ken) {
  for (const [region, kens] of Object.entries(window.japanRegions)) {
    if (kens.includes(ken)) {
      return region
    }
  }
  return null
}

function walkAdvance() {
  console.log('=================== CLICK ===================')
  let el = d3.select(".main-photo")
  let attrs = el.node().attributes

  let el_id = el.attr("id")

  let det_prefix = 'det_'

  let catNamesPre = []
  for (attr of attrs) {
    if (attr.name.startsWith(det_prefix)) {
      let catName = attr.name.slice(det_prefix.length).replace('_', ' ')

      if (catName != "person") {
        catNamesPre.push(catName)
      }
    }
  }

  let allCandidates = {}
  // assemble candidates and calculate length of each set
  let nCandidates = 0
  for (let i in catNamesPre) {
    let catName = catNamesPre[i]
    let catCandidates = window.photo_metadata_byobj[catName]
    allCandidates[catNamesPre[i]] = []
    catCandidates.forEach(c => {
      if (!galleryHistoryIncludes(c)) {
        allCandidates[catNamesPre[i]].push(c)
      }
    })

    nCandidates += allCandidates[catNamesPre[i]].length
  }

  // calculate proportion that each category contributes to the set
  // if there are no candidates for a given category, remove it at this point
  let catNames = []
  let catProps = {}
  for (let i in catNamesPre) {
    let catName = catNamesPre[i]

    if (allCandidates[catName].length > 0) {
      catProps[catName] = allCandidates[catName].length / nCandidates
      catNames.push(catName)
    }
  }

  // create weighted list of keys based on "uncommon-ness" of each key
  let weightedKeys = [];

  let transitionPossible = true;
  if (catNames.length > 1) {
    catNames.forEach(catName => {
      let uncommon = (1 - catProps[catName]) * 100
      console.log(`${catName} uncommon: ${uncommon}`)
      for (let i = 0; i < uncommon; i++) {
        weightedKeys.push(catName);
      }
    });
  }
  else {
    weightedKeys = catNames
  }
  // "shuffle" keys (I feel like this shouldn't matter)
  shuffleArray(weightedKeys)
  console.log('weightedKeys')
  console.log(weightedKeys)

  let selID = ""
  let selCat = null
  if (weightedKeys.length > 0) {
    selCat = randomEl(weightedKeys)
    selID = randomEl(allCandidates[selCat])
  }
  else {
    return walkEnd()
  }

  displayImg(selID, ".main-photo")
  // required to update the history
  displayLocation(selID, selCat)

  let lastPhotoID = galleryHistoryGetFromEnd(1).id
  d3.select(".last-photo").classed("inactive", false)
  displayImg(lastPhotoID, ".last-photo")
}

function locationName(loc) {
  return loc.subneighborhood || loc.neighborhood || loc.city || loc.prefecture
}

function locationCoords(loc) {
  for (const name of [loc.subneighborhood, loc.neighborhood, loc.city]) {
    if (name && window.japanLocations[name]) {
      return [window.japanLocations[name].lon, window.japanLocations[name].lat]
    }
  }
  let ken = mapGetKen(window.mapKenFeatures, loc.prefecture)
  return ken ? d3.geoCentroid(ken) : null
}

function walkCities(gh) {
  let cities = new Map()
  for (let e of gh) {
    let name = e.location.city || e.location.prefecture
    let key = `${e.location.prefecture}/${name}`
    if (!cities.has(key)) {
      cities.set(key, {
        name: name,
        location: e.location
      })
    }
  }
  return Array.from(cities.values())
}

function walkDistanceKm(gh) {
  const earthRadiusKm = 6371
  let coords = gh.map(e => locationCoords(e.location)).filter(c => c)
  let total = 0
  for (let i = 1; i < coords.length; i++) {
    total += d3.geoDistance(coords[i-1], coords[i]) * earthRadiusKm
  }
  return total
}

function walkDateRange(gh) {
  let times = gh.map(e => parseInt(e.id) * 1000).sort((a, b) => a - b)
  let part = (t, opts) => new Date(t).toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
    ...opts
  })

  let start = times[0]
  let end = times[times.length-1]
  let startMonth = part(start, { month: "short" })
  let endMonth = part(end, { month: "short" })
  let startDay = part(start, { day: "numeric" })
  let endDay = part(end, { day: "numeric" })

  if (startMonth != endMonth) {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`
  }
  if (startDay != endDay) {
    return `${startMonth} ${startDay} - ${endDay}`
  }
  return `${startMonth} ${startDay}`
}

function summaryHighlight(ken) {
  d3.selectAll("#summary-map .ken.visitedKen")
    .classed("hoveredKen", d => d.properties.nam.split(" ")[0] == ken)
  d3.selectAll(".summary-gallery .fj-gallery-item")
    .classed("faded", d => d.location.prefecture != ken)
}

function summaryUnhighlight() {
  d3.selectAll("#summary-map .ken").classed("hoveredKen", false)
  d3.selectAll(".summary-gallery .fj-gallery-item").classed("faded", false)
}

function walkEnd() {
  console.log('=============WALK COMPLETE============')
  let gh = window.galleryHistory

  d3.select(".sidebar-container").classed("walk-complete", true)

  let cities = walkCities(gh)
  let prefectures = new Set(gh.map(e => e.location.prefecture))

  let km = walkDistanceKm(gh)
  let fmt = n => n.toLocaleString(undefined, { maximumFractionDigits: n < 10 ? 1 : 0 })
  let miles = fmt(km * 0.621371)
  d3.select(".summary-title").text(miles == "0"
    ? "A short walk."
    : `You walked ${miles} ${miles == "1" ? "mile" : "miles"}.`)

  d3.select(".summary-counts").text([
    `${gh.length} ${gh.length == 1 ? "stop" : "stops"}`,
    walkDateRange(gh)
  ].join(" · "))

  d3.select(".summary-prefectures .prefecture-list").text(Array.from(prefectures).join(", "))

  d3.select(".summary-stops")
    .selectAll("li").data(cities)
    .enter()
    .append("li")
    .attr("title", d => d.location.prefecture)
    .text(d => d.name)

  mapSetup("#summary-map")
  prefectures.forEach(ken => {
    d3.select(`#summary-map .ken.${ken}`).classed("visitedKen", true)
  })

  d3.selectAll("#summary-map .ken.visitedKen")
    .on("mouseenter", (e, d) => summaryHighlight(d.properties.nam.split(" ")[0]))
    .on("mouseleave", () => summaryUnhighlight())

  let s = d3.select(".summary")
  let items = s.select(".fj-gallery")
    .selectAll("div").data(gh)
    .enter()
    .append("div")
    .attr("class", "fj-gallery-item")

  items
    .on("mouseenter", (e, d) => summaryHighlight(d.location.prefecture))
    .on("mouseleave", () => summaryUnhighlight())

  items.append("img")
    .attr("src", d => `/assets/img/posts/${window.pageName}/${d.id}.webp`)

  items.append("div")
    .attr("class", "summary-photo-label")
    .text(d => {
      let name = locationName(d.location)
      let city = d.location.city
      return city && city != name ? `${name}, ${city}` : name
    })

  let bandHeight = document.querySelector(".summary-content").offsetHeight
  d3.select(".summary-gallery").style("padding-bottom", `${bandHeight}px`)

  gallerySetup()
}

function gallerySetup() {
  var galleryRowTol = 0.3
  if (window.galleryRowTol) {
    galleryRowTol = window.galleryRowTol
  }
  var galleryLastRow = "left"
  if (window.galleryLastRow) {
    galleryLastRow = window.galleryLastRow
  }

  for (let id in window.galleries) {
    console.log('do the gallery')
    console.log('id')
    console.log(id)
    let info = window.galleries[id]
    let infoObj = {
      itemSelector: '.fj-gallery-item',
      transitionDuration: 0,
      gutter: parseInt(info.gutter),
      rowHeight: info.row_height,
      rowHeightTolerance: galleryRowTol,
      lastRow: galleryLastRow,
      calculateItemsHeight: true
    }
    console.log('infoObj')
    console.log(infoObj)
    console.log('document.querySelectorAll(`#${id}`)')
    console.log(document.querySelectorAll(`#${id}`))
    var res = fjGallery(document.querySelectorAll(`#${id}`), {
      itemSelector: '.fj-gallery-item',
      transitionDuration: 0,
      gutter: parseInt(info.gutter),
      rowHeight: info.row_height,
      rowHeightTolerance: galleryRowTol,
      lastRow: galleryLastRow,
      calculateItemsHeight: true
    });
    console.log('res')
    console.log(res)
    console.log('we didnt die')
  }
}

function mapGetKen(array, name) {
  return array.find(item => item.properties.nam.toLowerCase().includes(name.toLowerCase()));
}

function mapDeselectAll() {
  // deselect all
  d3.selectAll("#japan-map .ken").classed("activeKen", false)
  d3.selectAll("#japan-map .ken").classed("activeRegion", false)
}

function mapSelectKen(ken) {
  d3.select(`#japan-map .ken.${ken}`).classed("activeKen", true)
}

function mapSelectRegion(region) {
  const kens = window.japanRegions[region]

  kens.forEach(ken => {
    d3.select(`#japan-map .ken.${ken}`).classed("activeRegion", true)
  })
}

function mapSetup(containerSel="#japan-map") {
  console.log('do map setup!')
  // TODO: "window.japan" is embedded in the page by jekyll
  //       maybe better to load it async

  // indebted to this: https://gist.github.com/nebuta/8515744
  // var width = 300
  // var height = 300

  var svg = d3.select(containerSel).append("svg")
    .attr("width", "100%")
    .attr("height", "100%");

  var size = svg.node().getBoundingClientRect()
  var width = size.width
  var height = size.height
  console.log('size')
  console.log(size)

  var proj = d3.geoMercator()
    .precision(0.1)
    .center([137.9, 38.4])
    .rotate([0,0,0])
    .scale(2.7*width)
    .translate([width / 2, height / 2]);

  var path = d3.geoPath().projection(proj);

  // simplify the map
  var japanPre = topojson.presimplify(window.japan)
  window.mapJapanSimp = topojson.simplify(japanPre, 4e-3)
  window.mapJapanSimp = topojson.filter(window.mapJapanSimp, topojson.filterAttachedWeight(window.mapJapanSimp, 1))

  var subunits = topojson.feature(window.mapJapanSimp, window.mapJapanSimp.objects.japan);
  window.mapKenFeatures = subunits.features

  var g = svg.append('g');

  var mapMergeCountry = topojson.merge(window.mapJapanSimp, window.mapJapanSimp.objects.japan.geometries)

  // country
  g.append("path")
    .datum(mapMergeCountry)
    .attr("d", path)
    .attr("class", "country")

  const regions = []
  for (const r in window.japanRegions) {
    let region = topojson.merge(window.mapJapanSimp, window.japanRegions[r].map(k => {
      return mapGetKen(window.mapJapanSimp.objects.japan.geometries, k)
    }))

    region["properties"] = {
      nam: r
    }
    regions.push(region)
  }
  console.log('regions')
  console.log(regions)
  console.log('subunits.features')
  console.log(subunits.features)
  // for (const r in regions) {
  //   console.log('r')
  //   console.log(r)
  //   let res = topojson.merge(window.mapJapanSimp, regions[r])
  //   console.log('res')
  //   console.log(res)
  // }
  // for region in regions
  // grab all the geometries for that region
  // merge them, stick them into an array

  // regions
  g.append("path")
    .datum(mapMergeCountry)
    .attr("d", path)
    .attr("class", "country")

  // regions
  g.selectAll(".region")
    .data(regions)
    .enter().append("path")
    .attr("class", function(d) {
      return `region ${d.properties.nam.split(" ")[0]}`;
    })
    .attr("d", path);

  // prefectures
  g.selectAll(".ken")
    .data(subunits.features)
    .enter().append("path")
    .attr("class", function(d) {
      return `ken ${d.properties.nam.split(" ")[0]}`;
    })
    .attr("d", path);
}

function mockFinish() {
  window.galleryHistory = JSON.parse(window.finishSequence)

  var selID = galleryHistoryGetFromEnd(0).id
  var selCat = galleryHistoryGetFromEnd(0).reason

  displayImg(selID, ".main-photo")
  // required to update the history
  displayLocation(selID)

  let lastPhotoID = galleryHistoryGetFromEnd(1).id
  d3.select(".last-photo").classed("inactive", false)
  displayImg(lastPhotoID, ".last-photo")
}

function walkStart() {
  window.galleryHistory = []

  let imgs = Object.keys(window.photo_metadata)

  let img = null;
  do {
    img = randomEl(imgs);
  } while (Object.keys(window.photo_metadata[img].detections).length === 0);

  displayImg(img, ".main-photo")
  displayLocation(img, "NONE")
}

function walkReset() {
  let s = d3.select(".summary")

  for (let id in window.galleries) {
    fjGallery(document.querySelectorAll(`#${id}`), "destroy")
  }
  s.select(".fj-gallery").selectAll("*").remove()
  s.select("#summary-map").selectAll("*").remove()
  s.select(".summary-stops").selectAll("*").remove()
  s.selectAll(".summary-title, .summary-counts, .prefecture-list").text("")

  d3.select(".last-photo").classed("inactive", true)
  d3.select(".sidebar-container").classed("walk-complete", false)

  if (window.location.search) {
    window.history.replaceState(null, "", window.location.pathname)
  }

  walkStart()
}

function main(event) {
  console.log('Image Browser')

  mapSetup()
  // svgJapan({ element: "#japan-map" })

  walkStart()

  d3.select('#featured-image')
    .on("click", () => walkAdvance())

  d3.select('.walk-advance')
    .on("click", () => walkAdvance())

  d3.select('.new-walk')
    .on("click", () => walkReset())

  d3.select(document)
    .on("keydown", (e) => {
      let isSpace = e.key == " "
      if (!(isSpace || e.key == "ArrowRight")) return
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
      if (isSpace && e.target.closest("button")) return
      if (d3.select(".sidebar-container").classed("walk-complete")) return

      e.preventDefault()
      walkAdvance()
    })

  document.querySelector(".summary-panel").addEventListener("wheel", (e) => {
    let lineHeight = e.deltaMode == 1 ? 16 : 1
    document.querySelector(".summary-gallery").scrollBy(0, e.deltaY * lineHeight)
    e.preventDefault()
  }, { passive: false })

  d3.select('.sidebar-container')
    .on("mousedown", (e) => {
      if (e.detail > 1) {
        e.preventDefault()
      }
    })

  if (new URLSearchParams(window.location.search).has("mock")) {
    mockFinish()
    walkEnd()
  }
}
