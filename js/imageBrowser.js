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

window.galleryHistory = []

function displayOneImg(imgID) {
  let res = d3.select("#id"+imgID)

  d3.selectAll(".photo-list").style("display", "none")
  res.style("display", "flex")
}

function click(e) {
  let el = d3.select(e.target.parentElement)
  let attrs = el.node().attributes

  let el_id = el.attr("id")
  window.galleryHistory.push(el_id)

  let det_prefix = '"det_'

  let all_candidates = []
  for (attr of attrs) {
    if (attr.name.startsWith(det_prefix)) {
      let catname = attr.name.slice(det_prefix.length).slice(0, -1)

      all_candidates = all_candidates.concat(window.photo_metadata_byobj[catname])
    }
  }
  let sel_id = ""
  let n_tries = 0
  let max_tries = 50
  do {
    sel_id = randomEl(all_candidates)
    n_tries++
  } while (((sel_id == "") || (window.galleryHistory.includes("id"+sel_id))) && (n_tries < max_tries))
  if (n_tries == max_tries) {
    alert('i am defeated')
  }

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

  d3.selectAll('.photo-list')
    .on("click", (e) => click(e))
}