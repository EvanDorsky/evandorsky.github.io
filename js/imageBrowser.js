(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

function detectButtonClick(e) {
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

function main(event) {
  d3.selectAll('.detect-button')
    .on("click", (e) => detectButtonClick(e))
}