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

window.galleryHistory = []

function displayOneImg(imgID) {
  let imgContainer = d3.select(".photo-list")
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
}

function click(e) {
  let el = d3.select(e.target.parentElement)
  let attrs = el.node().attributes

  let el_id = el.attr("id")
  window.galleryHistory.push(el_id)

  let det_prefix = 'det_'

  let all_candidates = []
  for (attr of attrs) {
    if (attr.name.startsWith(det_prefix)) {
      let catname = attr.name.slice(det_prefix.length)

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