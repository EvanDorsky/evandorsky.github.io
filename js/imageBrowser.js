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
  let locDict = {
    "country": location[1],
    "city": location[2],
    "neighborhood": "",
    "subneighborhood": ""
  }
  if (location.length >= 4) {
    locDict.neighborhood = location[3]
  }
  if (location.length >= 5) {
    locDict.subneighborhood = location[4]
  }

  return locDict
}

function displayOneImg(imgID) {
  let imgContainer = d3.select(".main-photo")
  let img = imgContainer.select("img")

  let img_src = img.attr("src")
  let src_split = img_src.split("/")
  let new_src = src_split.slice(0, -1).join("/")+"/"+imgID+".webp"

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

  // change the id
  imgContainer.attr("id", `id${imgID}`)
  // change the img src
  img.attr("src", new_src)

  // update the location
  let loc = metadataGetLocation(window.photo_info[imgID])
  d3.select("div.reason").text(`${window.galleryHistoryReason[window.galleryHistoryReason.length-1]}`)
  d3.select("div.neighborhood").text(`${loc.neighborhood} ${loc.subneighborhood}`)
  d3.select("div.city").text(`${loc.city}`)
}

function click(e) {
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
      if (!(window.galleryHistoryID.includes(c))) {
        allCandidates[catNames[i]].push(c)
      }
    })

    nCandidates += catCandidates.length
  }

  // calculate proportion that each category contributes to the set
  let catProps = {}
  for (let i in catNames) {
    let catName = catNames[i]

    catProps[catName] = window.photo_metadata_byobj[catName].length / nCandidates
  }

  // create weighted list of keys based on "uncommon-ness" of each key
  let weightedKeys = [];
  if (catNames.length > 1) {
    catNames.forEach(catName => {
      let uncommon = (1 - catProps[catName]) * 100
      for (let i = 0; i < uncommon; i++) {
        weightedKeys.push(catName);
      }
    });
  } else {
    weightedKeys = catNames
  }

  let sel_id = ""
  let selCat = null
  let n_tries = 0
  let max_tries = 100
  do {
    selCat = randomEl(weightedKeys)
    sel_id = randomEl(allCandidates[selCat])
    n_tries++
  } while (((sel_id == "") || (window.galleryHistoryID.includes("id"+sel_id))) && (n_tries < max_tries))
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