(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

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

function click(e) {
  console.log('=================== CLICK ===================')
  let el = d3.select(e.target.parentElement)
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

function walkEnd() {
  console.log('=============WALK COMPLETE============')
  let gh = window.galleryHistory

  // objects used as transitions
  let objects = gh.map(e => e.reason)
  let objsByFreq = {}
  for (let obj of objects) {
    if (obj == "NONE") {
      continue
    }
    if (obj in objsByFreq) {
      objsByFreq[obj] += 1
    } else {
      objsByFreq[obj] = 1
    }
  }

  console.log('objsByFreq')
  console.log(objsByFreq)

  // locations
  let locs = gh.map(e => e.location)
  let locSet = new Set(locs)

  let locSets = {}
  for (let key in locs[0]) {
    locSets[key] = new Set(locs.map(l => l[key]))
  }

  console.log('locSets')
  console.log(Object.entries(locSets))

  let locDataDisplay = Object.entries(locSets)
      .filter(d => [
        "region",
        "prefecture",
        "city"
      ].includes(d[0]))

  d3.select(".main-photo").select("img").style("display", "none")
  d3.select(".last-photo").classed("inactive", true)

  let s = d3.select(".summary")
  s.select(".location")
    .selectAll("div").data(locDataDisplay)
    .enter()
    .append("div")
    .text(d => Array.from(d[1].values()).join(", "))
    var res = d3.select(".summary").select(".location")

  let ghO = Object.entries(gh)
  s.select(".gallery")
  .selectAll("img").data(ghO)
  .enter()
  .append("img")
  .attr("src", d => `/assets/img/posts/${window.pageName}/${d[1].id}.webp`)
}

function mapGetKen(array, name) {
  return array.find(item => item.properties.nam.toLowerCase().includes(name.toLowerCase()));
}

function mapDeselectAll() {
  // deselect all
  d3.selectAll(".ken").classed("activeKen", false)
  d3.selectAll(".ken").classed("activeRegion", false)
}

function mapSelectKen(ken) {
  d3.select(`.${ken}`).classed("activeKen", true)
}

function mapSelectRegion(region) {
  const kens = window.japanRegions[region]

  kens.forEach(ken => {
    d3.select(`.${ken}`).classed("activeRegion", true)
  })
}

function mapSetup() {
  console.log('do map setup!')
  // TODO: "window.japan" is embedded in the page by jekyll
  //       maybe better to load it async

  // indebted to this: https://gist.github.com/nebuta/8515744
  // var width = 300
  // var height = 300

  var svg = d3.select("#japan-map").append("svg")
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

function main(event) {
  console.log('Image Browser')

  mapSetup()
  // svgJapan({ element: "#japan-map" })

  let imgs = Object.keys(window.photo_metadata)
  
  let img = null;
  do {
    img = randomEl(imgs);
  } while (Object.keys(window.photo_metadata[img].detections).length === 0);

  displayImg(img, ".main-photo")
  displayLocation(img, "NONE")

  d3.selectAll('.main-photo')
    .on("click", (e) => click(e))

  mockFinish()
}