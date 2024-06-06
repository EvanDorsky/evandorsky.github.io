(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

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

function displayImg(imgID, containerSel) {
  // console.log('display image')
  // console.log(imgID)
  console.log('containerSel')
  console.log(containerSel)
  let imgContainer = d3.select(containerSel)
  let img = imgContainer.select("img")
  console.log('img')
  console.log(img)
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
  // console.log('dets')
  // console.log(dets)
  for (let det in dets) {
    imgContainer.attr(`det_${det.replace(' ', '_')}`, dets[det])
  }

  let img_src = img.attr("src")
  let src_split = img_src.split("/")
  let new_src = src_split.slice(0, -1).join("/")+"/"+imgID+".webp"

  // let lastimgID = window.galleryHistoryID[window.galleryHistoryID.length-1]
  // if (lastimgID) {
  //   lastimgID = lastimgID.slice(2)
  // }
  // let last_src = src_split.slice(0, -1).join("/")+"/"+lastimgID+".webp"

  // change the id
  imgContainer.attr("id", `id${imgID}`)
  // change the img src
  img.attr("src", new_src)

  // change the id
  // lastimgContainer.attr("id", `id${lastimgID}`)
  // change the img src
  // lastimg.attr("src", last_src)

  // update the location
  // let loc = metadataGetLocation(window.photo_info[imgID])
  // let reason = window.galleryHistoryReason[window.galleryHistoryReason.length-1]
  // if (reason) {
  //   reason = reason.charAt(0).toUpperCase() + reason.substring(1)
  // }
  // d3.select(".reason").text(`${reason}`)
  // d3.select(".region").text(`${loc.region}`)
  // d3.select(".prefecture").text(`${loc.prefecture}`)
  // let neighborhood_text = loc.neighborhood

  // if (loc.subneighborhood) {
  //   neighborhood_text += ' ' + loc.subneighborhood
  // }

  // d3.select(".neighborhood").text(`${neighborhood_text}`)

  // let city_text = loc.city

  // // if (neighborhood_text) {
  // //   city_text = ', '+city_text
  // // }
  // d3.select(".city").text(city_text)
}

function displayLocation(imgID) {
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

  mapSelect(loc.prefecture)

  // if (neighborhood_text) {
  //   city_text = ', '+city_text
  // }
  // d3.select(".city").text(city_text)
}

function click(e) {
  console.log('=================== CLICK ===================')
  let el = d3.select(e.target.parentElement)
  let attrs = el.node().attributes

  let el_id = el.attr("id")
  window.galleryHistoryID.push(el_id.slice(2))

  let det_prefix = 'det_'

  let allCandidates = {}
  let catNames = []

  for (attr of attrs) {
    if (attr.name.startsWith(det_prefix)) {
      let catName = attr.name.slice(det_prefix.length).replace('_', ' ')

      if (catName != "person") {
        catNames.push(catName)
      }
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
  } while (((sel_id == "") || (sel_id == undefined) || (window.galleryHistoryID.includes(sel_id))) && (n_tries < max_tries))
  if (n_tries == max_tries) {
    alert('i am defeated')
  }

  window.galleryHistoryReason.push(selCat)

  displayImg(sel_id, ".main-photo")
  displayLocation(sel_id)

  let last_photo = window.galleryHistoryID[window.galleryHistoryID.length - 1]
  displayImg(last_photo, ".last-photo")
}

function mapSelect(ken) {
  console.log('mapSelect')
  const kens = window.japan.objects.japan.geometries

  const searchNam = (array, name) => {
    return array.find(item => item.properties.nam.toLowerCase().includes(name.toLowerCase()));
  };
  const res = searchNam(kens, ken)

  d3.selectAll(".ken").classed("active", false)
  d3.select(`.${ken}`).classed("active", true)

  console.log('res')
  console.log(res)
}

function mapSetup() {
  console.log('do map setup!')
  // TODO: "window.japan" is embedded in the page by jekyll
  //       maybe better to load it async

  // indebted to this: https://gist.github.com/nebuta/8515744
  var width = 500
  var height = 500

  var svg = d3.select("#japan-map").append("svg")
    .attr("width", width)
    .attr("height", height);

  var proj = d3.geoMercator()
    .precision(0.1)
    .center([138, 35])
    //  .parallels([50, 60])
    .rotate([0,0,0])
    .scale(1200)
    .translate([width / 2, height / 2]);

    var path;
    var paths;
    var info = svg.append('text')
      .attr('width',80)
      .attr('height',20)
      .attr('y',10)
      .attr('fill','black');

  var subunits = topojson.feature(window.japan, window.japan.objects.japan);
  console.log('subunits.features')
  console.log(subunits.features)
  path = d3.geoPath().projection(proj);

  g = svg.append('g');
  var cities = g.selectAll(".city")
    .data(subunits.features)
    .enter().append("path")
    .attr("class", function(d) {
      console.log('HEY IM WALKIN HERE')
      console.log(d.properties.nam)
      return `ken ${d.properties.nam.split(" ")[0]}`;
    })
    .attr("d", path);

  console.log('cities')
  var res = g.selectAll(".city")
  console.log(res)
}

function main(event) {
  console.log('Image Browser')

  mapSetup()

  let imgs = Object.keys(window.photo_metadata)
  
  let img = null;
  do {
    img = randomEl(imgs);
  } while (Object.keys(window.photo_metadata[img].detections).length === 0);

  displayImg(img, ".main-photo")
  displayLocation(img)

  d3.selectAll('.main-photo')
    .on("click", (e) => click(e))
}