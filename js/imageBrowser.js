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
window.walkAnimations = []
window.seenImages = new Set()

const WALK_SEEN_WEIGHT = 0.05

const WALK_FADE = 520
document.documentElement.style.setProperty("--walk-fade", `${WALK_FADE}ms`)

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

function photoSwap(el, src, fade, container) {
  let token = (el.photoSwapToken || 0) + 1
  el.photoSwapToken = token

  let swapped
  let done = new Promise(resolve => swapped = resolve)
  let swap = () => {
    el.setAttribute("src", src)
    swapped()
  }

  if (!fade || walkReducedMotion()) {
    swap()
    return done
  }

  let next = new Image()
  next.src = src
  next.decode().catch(() => {}).then(() => {
    if (el.photoSwapToken != token) return

    container.querySelectorAll(".photo-ghost").forEach(g => g.remove())
    el.getAnimations().forEach(a => a.cancel())

    if (!el.getAttribute("src")) {
      swap()
      el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: WALK_EASE })
      return
    }

    let r = imgContentRect(el)
    let c = container.getBoundingClientRect()

    let ghost = el.cloneNode()
    ghost.removeAttribute("id")
    ghost.classList.add("photo-ghost")
    Object.assign(ghost.style, rectStyle({ ...r, left: r.left - c.left, top: r.top - c.top }))
    container.prepend(ghost)
    swap()

    let opts = { duration: 450, easing: WALK_EASE }
    el.animate([{ opacity: 0 }, { opacity: 1 }], opts)
    ghost.animate([{ opacity: 1 }, { opacity: 1, offset: 0.4 }, { opacity: 0 }], { ...opts, fill: "forwards" })
      .finished.then(() => ghost.remove()).catch(() => {})
  })
  return done
}

function reasonKey(e) {
  return e.reason && e.reason.toUpperCase() != "NONE" ? e.reason.toLowerCase() : null
}

function objectNameLower(category) {
  let name = objectName(category)
  return name == name.toUpperCase() ? name : name.toLowerCase()
}

function objectPlural(name) {
  if (name == "person") return "people"
  if (/fe$/.test(name)) return name.replace(/fe$/, "ves")
  if (/(s|sh|ch|x)$/.test(name)) return name + "es"
  return name + "s"
}

function numberWord(n) {
  let ones = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
  let tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
  if (n < 20) return ones[n]
  if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? `-${ones[n % 10]}` : "")
  return n.toLocaleString()
}

function walkObjectCounts(gh) {
  let counts = new Map()
  gh.forEach(e => {
    let key = reasonKey(e)
    if (key) counts.set(key, (counts.get(key) || 0) + 1)
  })
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category, n]) => {
      let name = objectNameLower(category)
      return { category, text: `${numberWord(n)} ${n == 1 ? name : objectPlural(name)}` }
    })
}

function objectPhrase(category) {
  let name = objectNameLower(category)
  let article = /^[aeiou]/i.test(name) ? "an" : "a"
  return `${article} ${name}`
}

const WALK_LABELS = "loud"
const WALK_CALLOUT_LEAVE = 1500
const WALK_CALLOUT_LEAVE_SAME = 500
const WALK_CALLOUT_ARRIVE = 2000
const WALK_SPOTLIGHT_FADE = 0.35

function walkFlashClear() {
  document.querySelectorAll(".walk-callout, .walk-spotlight").forEach(el => el.remove())

  let quiet = document.querySelector(".walk-flash")
  quiet.getAnimations().forEach(a => a.cancel())
  quiet.textContent = ""
}

function walkQuietFlash(category) {
  let el = document.querySelector(".walk-flash")
  el.getAnimations().forEach(a => a.cancel())
  el.textContent = objectPhrase(category)
  if (walkReducedMotion()) return

  let fadeIn = 360
  let hold = 5000
  let fadeOut = 630
  let duration = fadeIn + hold + fadeOut
  el.animate([
    { opacity: 0, easing: "ease-in-out" },
    { opacity: 1, offset: fadeIn / duration },
    { opacity: 1, offset: (fadeIn + hold) / duration, easing: "ease-in-out" },
    { opacity: 0 }
  ], { duration, fill: "forwards" })
}

function walkSpotlight(container, r, c, d, unfade) {
  let spot = document.createElement("div")
  spot.className = "walk-spotlight"
  Object.assign(spot.style, rectStyle({ ...r, left: r.left - c.left, top: r.top - c.top }))

  let cx = (d.box.x1 + d.box.x2) / 2 * r.width
  let cy = (d.box.y1 + d.box.y2) / 2 * r.height
  let rx = Math.max(40, (d.box.x2 - d.box.x1) / 2 * r.width * 1.5)
  let ry = Math.max(40, (d.box.y2 - d.box.y1) / 2 * r.height * 1.5)
  let inner = 0.3
  let stops = d3.range(0, 1.0001, 0.1).map(t => {
    let a = WALK_SPOTLIGHT_FADE * t * t * (3 - 2 * t)
    return `rgba(var(--bg-color-rgb), ${a.toFixed(3)}) ${((inner + (1 - inner) * t) * 100).toFixed(1)}%`
  })
  spot.style.background = `radial-gradient(${rx}px ${ry}px at ${cx}px ${cy}px, ${stops.join(", ")})`
  container.appendChild(spot)

  if (walkReducedMotion()) return
  if (unfade) {
    let fadeIn = Math.min(400, unfade / 3)
    spot.animate([
      { opacity: 0, easing: WALK_EASE },
      { opacity: 1, offset: fadeIn / unfade, easing: "ease-in-out" },
      { opacity: 0 }
    ], { duration: unfade, fill: "forwards" })
  } else {
    spot.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 600, easing: WALK_EASE })
  }
}

function walkCalloutBox(imgID, category) {
  let boxes = (window.photo_metadata[imgID].detect_boxes || [])
    .filter(d => d.object == category)
  let area = d => (d.box.x2 - d.box.x1) * (d.box.y2 - d.box.y1)
  return boxes.reduce((a, b) => (!a || area(b) > area(a)) ? b : a, null)
}

function walkFlash(imgID, category, unfade=null) {
  walkFlashHide()
  window.walkFlashToken = (window.walkFlashToken || 0) + 1

  let container = document.querySelector(".main-photo")
  let img = document.querySelector("#featured-image")
  let el = document.createElement("div")
  el.className = "walk-callout"
  el.textContent = objectPhrase(category)
  container.appendChild(el)

  let r = imgContentRect(img)
  let c = container.getBoundingClientRect()
  let d = walkCalloutBox(imgID, category)
  let gap = 0

  let x = r.left + r.width / 2
  let y = r.top + r.height + gap
  let above = false
  if (d) {
    x = r.left + (d.box.x1 + d.box.x2) / 2 * r.width
    y = r.top + d.box.y2 * r.height + gap
    if (y + el.offsetHeight > r.top + r.height) {
      y = r.top + d.box.y1 * r.height - gap - el.offsetHeight
      above = true
    }
  }
  let half = el.offsetWidth / 2
  x = Math.max(r.left + half + gap, Math.min(r.left + r.width - half - gap, x))

  if (d) walkSpotlight(container, r, c, d, unfade)

  Object.assign(el.style, { left: `${x - half - c.left}px`, top: `${y - c.top}px` })

  if (!walkReducedMotion()) {
    el.animate([
      { opacity: 0, transform: `translateY(${above ? 4 : -4}px)` },
      { opacity: 1, transform: "none" }
    ], { duration: 400, easing: WALK_EASE })
  }
  return window.walkFlashToken
}

function walkFlashHide() {
  document.querySelectorAll(".walk-callout:not(.leaving), .walk-spotlight:not(.leaving)").forEach(el => {
    el.classList.add("leaving")
    if (walkReducedMotion()) return el.remove()
    el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: WALK_FADE, easing: WALK_EASE, fill: "forwards" })
      .finished.then(() => el.remove()).catch(() => {})
  })
}

function displayImg(imgID, containerSel, fade=true) {
  // console.log('display image')
  // console.log(imgID)
  // console.log('containerSel')
  // console.log(containerSel)
  let imgContainer = d3.select(containerSel)
  let img = imgContainer.select(":scope > img:not(.photo-ghost)")
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

  let new_src = `/assets/img/posts/${window.pageName}/${imgID}.webp`

  // change the id
  imgContainer.attr("id", `id${imgID}`)
  // change the img src
  return photoSwap(img.node(), new_src, fade, imgContainer.node())
}

function objectName(category) {
  if (!category) return ""
  let key = category.toLowerCase()
  return window.objectNames[key] || key.charAt(0).toUpperCase() + key.substring(1)
}

function displayLocation(imgID, reason=null) {
  // update the location
  let loc = metadataGetLocation(window.photo_info[imgID])
  textCrossfade(document.querySelector(".main-photo .photo-date"), photoDate(imgID))
  textCrossfade(document.querySelector(".sidebar .region"), loc.region)
  textCrossfade(document.querySelector(".sidebar .prefecture"), loc.prefecture)
  textCrossfade(document.querySelector(".sidebar .city"), loc.city || loc.prefecture)

  mapDeselectAll()
  mapSelectRegion(mapRegion(loc.prefecture))
  mapSelectKen(loc.prefecture)

  if (reason != null) {
    window.seenImages.add(imgID)
    window.galleryHistory.push({
      id: imgID,
      reason: reason,
      location: loc
    })
  }
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
  if (window.walkPending) return
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

  if (WALK_LABELS == "quiet") {
    displayImg(selID, ".main-photo")
    // required to update the history
    displayLocation(selID, selCat)
    walkQuietFlash(selCat)
    return
  }

  let from = galleryHistoryGetFromEnd(0)
  let fromID = from.id
  let leaveHold = reasonKey(from) == selCat.toLowerCase() ? WALK_CALLOUT_LEAVE_SAME : WALK_CALLOUT_LEAVE
  let walkID = window.walkID
  window.walkPending = true
  walkFlash(fromID, selCat, leaveHold)

  setTimeout(() => {
    if (walkID != window.walkID) return

    walkFlashHide()
    let arrived = displayImg(selID, ".main-photo")
    // required to update the history
    displayLocation(selID, selCat)

    arrived.then(() => {
      window.walkPending = false
      if (walkID != window.walkID) return

      let token = walkFlash(selID, selCat, WALK_CALLOUT_ARRIVE)
      setTimeout(() => {
        if (token == window.walkFlashToken) walkFlashHide()
      }, WALK_CALLOUT_ARRIVE)
    })
  }, leaveHold)
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

function photoDate(imgID) {
  return new Date(parseInt(imgID) * 1000).toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "long",
    day: "numeric"
  })
}

function textCrossfade(el, text) {
  if (el.textContent == text) return

  if (walkReducedMotion() || !el.textContent) {
    el.textContent = text
    return
  }

  el.parentNode.querySelectorAll(".text-ghost").forEach(g => g.remove())
  el.getAnimations().forEach(a => a.cancel())

  let ghost = el.cloneNode(true)
  ghost.classList.add("text-ghost")
  if (getComputedStyle(el).position != "absolute") {
    Object.assign(ghost.style, {
      position: "absolute",
      left: `${el.offsetLeft}px`,
      top: `${el.offsetTop}px`,
      width: `${el.offsetWidth}px`,
      margin: 0
    })
  }
  el.after(ghost)
  el.textContent = text

  let opts = { duration: WALK_FADE, easing: WALK_EASE }
  el.animate([{ opacity: 0 }, { opacity: 1 }], opts)
  ghost.animate([{ opacity: 1 }, { opacity: 1, offset: 0.4 }, { opacity: 0 }], { ...opts, fill: "forwards" })
    .finished.then(() => ghost.remove()).catch(() => {})
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

  let startYear = part(start, { year: "numeric" })
  let endYear = part(end, { year: "numeric" })

  if (startYear != endYear) {
    return `${startMonth} ${startDay}, ${startYear}-${endMonth} ${endDay}, ${endYear}`
  }
  if (startMonth != endMonth) {
    return `${startMonth} ${startDay}-${endMonth} ${endDay}, ${endYear}`
  }
  if (startDay != endDay) {
    return `${startMonth} ${startDay}-${endDay}, ${endYear}`
  }
  return `${startMonth} ${startDay}, ${endYear}`
}

function summaryMatcher(kens, object) {
  return object ? e => reasonKey(e) == object : e => kens.includes(e.location.prefecture)
}

function summaryHighlight(kens, object=null) {
  let key = summaryPinKey(kens, object)
  if (window.summaryKen == key) return
  window.summaryKen = key

  let matches = summaryMatcher(kens, object)
  let entries = window.galleryHistory.filter(matches)
  if (object) kens = entries.map(e => e.location.prefecture)
  let regions = entries.map(e => e.location.region)
  let objects = entries.map(reasonKey)

  d3.select(".summary-panel").classed("highlighting", true)
  d3.selectAll("#summary-map .ken.visitedKen")
    .classed("hoveredKen", d => kens.includes(d.properties.nam.split(" ")[0]))
  d3.selectAll(".summary-gallery .fj-gallery-item")
    .classed("faded", d => !matches(d))
  d3.selectAll(".object-list span")
    .classed("faded", d => !objects.includes(d.category))
  d3.selectAll(".region-list span")
    .classed("faded", d => !regions.includes(d))
  d3.selectAll(".prefecture-list span")
    .classed("faded", d => !kens.includes(d))
  d3.selectAll(".summary-stops li")
    .classed("faded", d => !kens.includes(d.location.prefecture))
}

function summaryFocus(kens, object=null) {
  summaryHighlight(kens, object)
  summaryReveal(summaryMatcher(kens, object))
}

function summaryRegionKens(region) {
  return Array.from(new Set(window.galleryHistory
    .filter(e => e.location.region == region)
    .map(e => e.location.prefecture)))
}

function summaryReveal(matches) {
  let gallery = document.querySelector(".summary-gallery")
  if (!gallery.classList.contains("ready")) return

  let top = gallery.getBoundingClientRect().top
  let bottom = document.querySelector(".summary-panel").getBoundingClientRect().top
  let middle = (top + bottom) / 2

  let centers = d3.selectAll(".summary-gallery .fj-gallery-item")
    .filter(matches)
    .nodes()
    .map(item => {
      let rect = item.getBoundingClientRect()
      return rect.top + rect.height / 2
    })

  if (centers.length == 0) return
  if (centers.some(c => c >= top && c <= bottom)) return

  let nearest = centers.reduce((a, b) => Math.abs(a - middle) < Math.abs(b - middle) ? a : b)
  summaryScrollBy(gallery, nearest - middle)
}

function summaryScrollCancel() {
  cancelAnimationFrame(window.summaryScrollFrame)
  window.summaryScrollFrame = null
}

function summaryScrollBy(el, delta) {
  summaryScrollCancel()

  let start = el.scrollTop
  let maxScroll = el.scrollHeight - el.clientHeight
  let end = Math.max(0, Math.min(maxScroll, start + delta))
  let distance = end - start
  if (distance == 0) return

  let duration = Math.min(1800, 800 + Math.abs(distance) * 0.5)
  let ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(2 - 2 * t, 3) / 2
  let t0 = null

  let step = (now) => {
    if (t0 == null) t0 = now
    let t = Math.min(1, (now - t0) / duration)
    el.scrollTop = start + distance * ease(t)
    window.summaryScrollFrame = t < 1 ? requestAnimationFrame(step) : null
  }
  window.summaryScrollFrame = requestAnimationFrame(step)
}

function summaryPinKey(kens, object) {
  return object ? `object:${object}` : kens.join("|")
}

function summaryPin(kens, object=null) {
  let pinned = window.summaryPinned
  if (pinned && summaryPinKey(pinned.kens, pinned.object) == summaryPinKey(kens, object)) {
    window.summaryPinned = null
    return
  }
  window.summaryPinned = { kens, object }
  summaryHighlight(kens, object)
}

function summaryUnpin() {
  window.summaryPinned = null
  summaryClear()
}

function summaryUnhighlight() {
  let pinned = window.summaryPinned
  if (pinned) return summaryHighlight(pinned.kens, pinned.object)
  summaryClear()
}

function summaryClear() {
  if (window.summaryKen == null) return
  window.summaryKen = null

  d3.select(".summary-panel").classed("highlighting", false)
  d3.selectAll("#summary-map .ken").classed("hoveredKen", false)
  d3.selectAll(".summary-gallery .fj-gallery-item, .region-list span, .prefecture-list span, .summary-stops li, .object-list span")
    .classed("faded", false)
}

function summaryGalleryPointer(e) {
  if (window.summaryScrolling) return

  let item = e.target.closest(".fj-gallery-item")
  let panelTop = document.querySelector(".summary-panel").getBoundingClientRect().top
  if (!item || e.clientY >= panelTop) {
    return summaryUnhighlight()
  }
  summaryHighlight([d3.select(item).datum().location.prefecture])
}

function summaryGalleryClick(e) {
  let item = e.target.closest(".fj-gallery-item")
  let panelTop = document.querySelector(".summary-panel").getBoundingClientRect().top
  if (!item || e.clientY >= panelTop) return summaryUnpin()
  summaryPin([d3.select(item).datum().location.prefecture])
}

function summaryGalleryScroll() {
  window.summaryScrolling = true
  clearTimeout(window.summaryScrollTimer)
  window.summaryScrollTimer = setTimeout(() => {
    window.summaryScrolling = false
  }, 150)
}

const WALK_EASE = "cubic-bezier(0.37, 0, 0.63, 1)"

function imgContentRect(img) {
  let r = img.getBoundingClientRect()
  let cs = getComputedStyle(img)
  let left = r.left + parseFloat(cs.paddingLeft)
  let top = r.top + parseFloat(cs.paddingTop)
  let width = r.width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
  let height = r.height - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)

  if (cs.objectFit == "contain" && img.naturalWidth) {
    let s = Math.min(width / img.naturalWidth, height / img.naturalHeight)
    left += (width - img.naturalWidth * s) / 2
    top += (height - img.naturalHeight * s) / 2
    width = img.naturalWidth * s
    height = img.naturalHeight * s
  }
  return { left, top, width, height }
}

function rectStyle(r) {
  return { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` }
}

const WALK_PAIRS = [
  [".sidebar .region-row", ".summary-regions", "corner"],
  [".sidebar .prefecture-row", ".summary-prefectures", "corner"],
  [".sidebar .city-row", ".summary-cities", "corner"],
  ["#japan-map", "#summary-map", "fit"],
  [".walk-advance", ".new-walk", "center"]
]

function walkReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function walkRect(sel) {
  return document.querySelector(sel).getBoundingClientRect()
}

function walkFlip(panel, opts) {
  return panel.map(({ from, to, align }) => {
    let el = document.querySelector(to)
    let r = el.getBoundingClientRect()
    let base = getComputedStyle(el).transform
    base = base == "none" ? "" : base

    let transform = `translate(${from.left - r.left}px, ${from.top - r.top}px)`
    if (align != "corner") {
      let dx = from.left + from.width / 2 - (r.left + r.width / 2)
      let dy = from.top + from.height / 2 - (r.top + r.height / 2)
      let s = align == "fit" ? from.width / r.width : 1
      transform = `translate(${dx}px, ${dy}px) scale(${s})`
    }
    return el.animate([
      { transform: `${transform} ${base}` },
      { transform: base || "none" }
    ], opts)
  })
}

function walkTransitionSources() {
  if (walkReducedMotion()) return null

  let photos = [{ sel: "#featured-image", offset: 0, opacity: 1 }]

  return {
    photos: photos.map(p => {
      let el = document.querySelector(p.sel)
      return { ...p, el, rect: imgContentRect(el) }
    }),
    panel: WALK_PAIRS.map(([walk, summary, align]) => ({ from: walkRect(walk), to: summary, align }))
  }
}

function walkTransitionPanel(sources) {
  let opts = { duration: 800, easing: WALK_EASE, fill: "backwards" }

  let anims = walkFlip(sources.panel, opts)

  document.querySelectorAll(".summary-title, .summary-counts, .summary-objects").forEach(el => {
    let opacity = parseFloat(getComputedStyle(el).opacity)
    anims.push(el.animate([
      { opacity: 0, transform: "translateY(0.5rem)" },
      { opacity, transform: "none" }
    ], { ...opts, delay: 300 }))
  })

  anims.forEach(a => a.pause())
  window.walkAnimations.push(...anims)
  return anims
}

function walkTransitionFlyers(sources) {
  return sources.photos.map(p => {
    let img = document.createElement("div")
    img.className = "walk-flyer"
    let full = document.createElement("img")
    full.src = p.el.getAttribute("src")
    img.appendChild(full)
    Object.assign(img.style, rectStyle(p.rect), { opacity: p.opacity })
    document.body.appendChild(img)
    return { ...p, img }
  })
}

function walkTransitionLand(flyers) {
  let items = d3.selectAll(".summary-gallery .fj-gallery-item").nodes()

  flyers.forEach(f => {
    let item = items[f.offset]
    if (!item) return f.img.remove()

    item.style.visibility = "hidden"

    let thumb = item.querySelector("img").cloneNode()
    thumb.className = "walk-flyer-thumb"
    f.img.appendChild(thumb)
    window.walkAnimations.push(thumb.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 1000, easing: WALK_EASE, fill: "forwards" }))

    let anim = f.img.animate([
      { ...rectStyle(f.rect), opacity: f.opacity },
      { ...rectStyle(item.getBoundingClientRect()), opacity: 0.6 }
    ], { duration: 1000, easing: WALK_EASE, fill: "forwards" })
    window.walkAnimations.push(anim)

    anim.finished.then(() => {
      item.style.visibility = ""
      f.img.remove()
      let label = item.querySelector(".photo-label")
      if (label) window.walkAnimations.push(label.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400, easing: WALK_EASE }))
    }).catch(() => {})
  })
}

function walkEnd() {
  console.log('=============WALK COMPLETE============')
  let gh = window.galleryHistory

  let sources = walkTransitionSources()
  walkFlashClear()
  d3.select(".sidebar-container").classed("walk-complete", true)

  let newWalk = document.querySelector(".new-walk")
  newWalk.disabled = true
  setTimeout(() => newWalk.disabled = false, 1000)

  let cities = walkCities(gh)
  let prefectures = new Set(gh.map(e => e.location.prefecture))
  let regions = new Set(gh.map(e => e.location.region))

  d3.select(".summary-regions .label").text(regions.size > 1 ? "Regions" : "Region")
  d3.select(".summary-prefectures .label").text(prefectures.size > 1 ? "Prefectures" : "Prefecture")
  d3.select(".summary-cities .label").text(cities.length > 1 ? "Cities" : "City")

  let objectCounts = walkObjectCounts(gh)
  d3.select(".summary-objects").style("display", objectCounts.length ? null : "none")
  d3.select(".summary-objects .object-list")
    .selectAll("span").data(objectCounts)
    .enter()
    .append("span")
    .text((d, i) => i == 0 ? d.text.charAt(0).toUpperCase() + d.text.substring(1) : d.text)
    .on("mouseenter", (e, d) => summaryFocus(null, d.category))
    .on("click", (e, d) => summaryPin(null, d.category))
    .on("mouseleave", () => summaryUnhighlight())

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

  d3.select(".summary-regions .region-list")
    .selectAll("span").data(Array.from(regions))
    .enter()
    .append("span")
    .text(d => d)
    .on("mouseenter", (e, d) => summaryFocus(summaryRegionKens(d)))
    .on("click", (e, d) => summaryPin(summaryRegionKens(d)))
    .on("mouseleave", () => summaryUnhighlight())

  d3.select(".summary-prefectures .prefecture-list")
    .selectAll("span").data(Array.from(prefectures))
    .enter()
    .append("span")
    .text(d => d)
    .on("mouseenter", (e, d) => summaryFocus([d]))
    .on("click", (e, d) => summaryPin([d]))
    .on("mouseleave", () => summaryUnhighlight())

  d3.select(".summary-stops")
    .selectAll("li").data(cities)
    .enter()
    .append("li")
    .attr("title", d => d.location.prefecture)
    .text(d => d.name)
    .on("mouseenter", (e, d) => summaryFocus([d.location.prefecture]))
    .on("click", (e, d) => summaryPin([d.location.prefecture]))
    .on("mouseleave", () => summaryUnhighlight())

  mapSetup("#summary-map")
  prefectures.forEach(ken => {
    d3.select(`#summary-map .ken.${ken}`).classed("visitedKen", true)
  })

  d3.selectAll("#summary-map .ken.visitedKen")
    .on("mouseenter", (e, d) => summaryFocus([d.properties.nam.split(" ")[0]]))
    .on("click", (e, d) => summaryPin([d.properties.nam.split(" ")[0]]))
    .on("mouseleave", () => summaryUnhighlight())

  let s = d3.select(".summary")
  let items = s.select(".fj-gallery")
    .selectAll("div").data(gh.slice().reverse())
    .enter()
    .append("div")
    .attr("class", "fj-gallery-item")

  items.append("img")
    .attr("src", d => `/assets/img/posts/${window.pageName}/thumb/${d.id}.webp`)

  let labels = items.append("div")
    .attr("class", "photo-label")

  labels.filter(d => d.reason && d.reason.toUpperCase() != "NONE")
    .append("div")
    .attr("class", "photo-label-object")
    .text(d => objectName(d.reason))

  labels.append("div")
    .text(d => {
      let name = locationName(d.location)
      let city = d.location.city
      return city && city != name ? `${name}, ${city}` : name
    })

  let bandHeight = document.querySelector(".summary-content").offsetHeight
  d3.select(".summary-gallery").style("padding-bottom", `${bandHeight}px`)

  let panelAnims = sources ? walkTransitionPanel(sources) : []
  let flyers = sources ? walkTransitionFlyers(sources) : []
  let startPanel = () => panelAnims.forEach(a => a.play())
  let panelTimer = setTimeout(startPanel, 800)

  let walkID = window.walkID
  let imgs = items.select("img").nodes()
  Promise.all(imgs.map(img => img.decode().catch(() => {}))).then(() => {
    if (walkID != window.walkID) return

    imgs.forEach(img => {
      img.setAttribute("width", img.naturalWidth)
      img.setAttribute("height", img.naturalHeight)
    })
    let justified = false
    gallerySetup(() => {
      if (justified || walkID != window.walkID) return
      justified = true

      d3.select(".summary-gallery").classed("ready", true)
      clearTimeout(panelTimer)
      startPanel()
      walkTransitionLand(flyers)
    })
  })
}

function gallerySetup(onJustify=null) {
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
      calculateItemsHeight: true,
      onJustify: onJustify
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

  displayImg(selID, ".main-photo", false)
  // required to update the history
  displayLocation(selID)
}

function walkStart() {
  window.walkID = (window.walkID || 0) + 1
  window.walkPending = false
  window.galleryHistory = []
  walkFlashClear()

  let imgs = Object.keys(window.photo_metadata)
    .filter(id => Object.keys(window.photo_metadata[id].detections).length > 0)
  let weights = imgs.map(id => window.seenImages.has(id) ? WALK_SEEN_WEIGHT : 1)

  let total = weights.reduce((a, b) => a + b, 0)
  let r = Math.random() * total
  let img = imgs.find((id, i) => (r -= weights[i]) < 0) || imgs[imgs.length - 1]

  displayImg(img, ".main-photo")
  displayLocation(img, "NONE")
}

function walkReturnSources() {
  if (walkReducedMotion()) return null

  let summary = document.querySelector(".summary")
  let ghost = summary.cloneNode(true)
  ghost.classList.add("summary-ghost")
  WALK_PAIRS.forEach(([walk, summarySel]) => {
    ghost.querySelector(summarySel).style.visibility = "hidden"
  })
  ghost.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"))

  return {
    ghost,
    scrollTop: summary.querySelector(".summary-gallery").scrollTop,
    panel: WALK_PAIRS.map(([walk, summarySel, align]) => ({ from: walkRect(summarySel), to: walk, align }))
  }
}

function walkReturn(sources) {
  let container = document.querySelector(".sidebar-container")
  container.appendChild(sources.ghost)
  sources.ghost.querySelector(".summary-gallery").scrollTop = sources.scrollTop

  let fade = sources.ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 700, easing: WALK_EASE, fill: "forwards" })
  fade.finished.then(() => sources.ghost.remove()).catch(() => {})
  sources.ghost.querySelectorAll(".summary-title, .summary-counts, .summary-objects").forEach(el => el.animate(
    [{ transform: "none" }, { transform: "translateY(1rem)" }],
    { duration: 700, easing: WALK_EASE, fill: "forwards" }))

  let anims = walkFlip(sources.panel, { duration: 800, easing: WALK_EASE })
  window.walkAnimations.push(fade, ...anims)
}

function walkReset() {
  let s = d3.select(".summary")
  let returnSources = walkReturnSources()

  for (let id in window.galleries) {
    fjGallery(document.querySelectorAll(`#${id}`), "destroy")
  }
  s.select(".fj-gallery").selectAll("*").remove()
  s.select("#summary-map").selectAll("*").remove()
  s.select(".summary-stops").selectAll("*").remove()
  s.selectAll(".summary-title, .summary-counts, .region-list, .prefecture-list, .object-list").text("")
  s.select(".summary-gallery").classed("ready", false)
  summaryScrollCancel()
  window.summaryKen = null
  window.summaryPinned = null

  window.walkAnimations.forEach(a => a.cancel())
  window.walkAnimations = []
  d3.selectAll(".walk-flyer, .summary-ghost").remove()

  d3.select(".sidebar-container").classed("walk-complete", false)

  if (window.location.search) {
    window.history.replaceState(null, "", window.location.pathname)
  }

  walkStart()
  if (returnSources) walkReturn(returnSources)
}

function navbarHeightTrack() {
  let navbar = document.getElementById("navbar")
  if (!navbar) return
  new ResizeObserver(() => {
    document.documentElement.style.setProperty("--navbar-height", `${navbar.offsetHeight}px`)
  }).observe(navbar)
}

function main(event) {
  console.log('Image Browser')

  navbarHeightTrack()

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

  d3.select(".summary-gallery")
    .on("mousemove", (e) => summaryGalleryPointer(e))
    .on("mouseleave", () => summaryUnhighlight())
    .on("click", (e) => summaryGalleryClick(e))

  document.querySelector(".summary-gallery")
    .addEventListener("scroll", summaryGalleryScroll, { passive: true })

  window.addEventListener("wheel", summaryScrollCancel, { passive: true })
  window.addEventListener("touchstart", summaryScrollCancel, { passive: true })

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
