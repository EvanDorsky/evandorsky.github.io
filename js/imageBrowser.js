(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

function randomEl(arr) {
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
      console.log(img)
    }
  }
}

// id="id{{ d[0] }}" 
//         {% for det in d[1].detections %}
//         "det_{{ det[0] | replace: ' ', '_' }}"="{{ det[1] }}"
//         {% endfor %}

// the ID we chose
window.galleryHistoryID = []
// the reason we chose it
window.galleryHistoryReason = []

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

function displayOneImg(imgID) {
  // console.log('display image')
  // console.log(imgID)
  let imgContainer = d3.select(".main-photo")
  let img = imgContainer.select("img")
  let lastimgContainer = d3.select(".last-photo")
  let lastimg = lastimgContainer.select("img")

  // change the detection attributes
  var attributes = imgContainer.node().attributes;
  for (let i = attributes.length - 1; i >= 0; i--) {
    if (attributes[i].name.startsWith('det_')) {
      imgContainer.attr(attributes[i].name, null);
    }
  }

  let dets = window.photo_metadata[imgID].detections
  // console.log('dets')
  // console.log(dets)
  for (let det in dets) {
    imgContainer.attr(`det_${det.replace(' ', '_')}`, dets[det])
  }

  let img_src = img.attr("src")
  let src_split = img_src.split("/")
  let new_src = src_split.slice(0, -1).join("/")+"/"+imgID+".webp"

  let lastimgID = window.galleryHistoryID[window.galleryHistoryID.length-1]
  if (lastimgID) {
    lastimgID = lastimgID.slice(2)
  }
  let last_src = src_split.slice(0, -1).join("/")+"/"+lastimgID+".webp"

  // change the id
  imgContainer.attr("id", `id${imgID}`)
  // change the img src
  img.attr("src", new_src)

  // change the id
  lastimgContainer.attr("id", `id${lastimgID}`)
  // change the img src
  lastimg.attr("src", last_src)

  // update the location
  let loc = metadataGetLocation(window.photo_info[imgID])
  let reason = window.galleryHistoryReason[window.galleryHistoryReason.length-1]
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

  // if (neighborhood_text) {
  //   city_text = ', '+city_text
  // }
  d3.select(".city").text(city_text)
}

function checkHistory(imgID) {
  return window.galleryHistoryID.includes("id"+imgID)
}

function click(e) {
  console.log('=================== CLICK ===================')
  let el = d3.select(e.target.parentElement)
  let attrs = el.node().attributes

  let el_id = el.attr("id")
  window.galleryHistoryID.push(el_id)

  let det_prefix = 'det_'

  let allCandidates = {}
  let catNames = []

  for (attr of attrs) {
    if (attr.name.startsWith(det_prefix)) {
      let catName = attr.name.slice(det_prefix.length).replace('_', ' ')

      catNames.push(catName)
    }
  }

  // assemble candidates and calculate length of each set
  let nCandidates = 0
  for (let i in catNames) {
    let catName = catNames[i]
    let catCandidates = window.photo_metadata_byobj[catName]
    allCandidates[catNames[i]] = []
    catCandidates.forEach(c => {
      if (!(checkHistory(c))) {
        allCandidates[catNames[i]].push(c)
      }
    })

    nCandidates += catCandidates.length
  }

  // calculate proportion that each category contributes to the set
  let catProps = {}
  for (let i in catNames) {
    let catName = catNames[i]

    // console.log('catName')
    // console.log(catName)
    // console.log('allCandidates[catName].length')
    // console.log(allCandidates[catName].length)
    if (allCandidates[catName].length > 1) {
      catProps[catName] = allCandidates[catName].length / nCandidates
    }
  }

  // create weighted list of keys based on "uncommon-ness" of each key
  let weightedKeys = [];
  console.log('catNames')
  console.log(catNames)
  if (catNames.length > 1) {
    catNames.forEach(catName => {
      let uncommon = (1 - catProps[catName]) * 100
      // console.log('catName')
      // console.log(catName)
      // console.log('uncommon')
      // console.log(uncommon)
      for (let i = 0; i < uncommon; i++) {
        weightedKeys.push(catName);
      }
    });
  } else {
    weightedKeys = catNames
  }
  // console.log('weightedKeys')
  // console.log(weightedKeys)

  let sel_id = ""
  let selCat = null
  let n_tries = 0
  let max_tries = 100
  do {
    // todo: fix this.
    // this fails if the selected category is empty
    // instead, it should preemptively ignore empty categories
    // and just pick the next best one

    // console.log('weightedKeys')
    // console.log(weightedKeys)
    selCat = randomEl(weightedKeys)
    // console.log('selCat')
    // console.log(selCat)
    // console.log('allCandidates[selCat].length')
    // console.log(allCandidates[selCat].length)
    sel_id = randomEl(allCandidates[selCat])

    n_tries++
  } while (((sel_id == "") || (sel_id == undefined) || (window.galleryHistoryID.includes("id"+sel_id))) && (n_tries < max_tries))
  if (n_tries == max_tries) {
    alert('i am defeated')
  }

  window.galleryHistoryReason.push(selCat)

  displayOneImg(sel_id)
}

function main(event) {
  console.log('Image Browser')
  let imgs = Object.keys(window.photo_metadata)
  
  let img = null;
  do {
    img = randomEl(imgs);
  } while (Object.keys(window.photo_metadata[img].detections).length === 0);

  displayOneImg(img)

  d3.selectAll('.main-photo')
    .on("click", (e) => click(e))
}