(
  function() {
    document.addEventListener("DOMContentLoaded", walkBoxesMain)
  }
)()

const WALK_SHOW_BOXES = false

function walkBoxesDraw() {
  let img = document.querySelector("#featured-image")
  let container = document.querySelector(".main-photo")
  let overlay = container.querySelector(".walk-boxes")
  if (!overlay) {
    overlay = document.createElement("div")
    overlay.className = "walk-boxes"
    container.appendChild(overlay)
  }
  overlay.innerHTML = ""

  let src = img.getAttribute("src")
  if (!src || !img.complete) return

  let id = src.split("/").pop().split(".")[0]
  let meta = window.photo_metadata[id]
  let boxes = meta && meta.detect_boxes ? meta.detect_boxes : []

  let cs = getComputedStyle(img)
  let left = img.offsetLeft + parseFloat(cs.paddingLeft)
  let top = img.offsetTop + parseFloat(cs.paddingTop)
  let width = img.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
  let height = img.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
  Object.assign(overlay.style, { left: `${left}px`, top: `${top}px`, width: `${width}px`, height: `${height}px` })

  boxes.forEach(d => {
    let box = document.createElement("div")
    box.className = "walk-box"
    Object.assign(box.style, {
      left: `${d.box.x1 * 100}%`,
      top: `${d.box.y1 * 100}%`,
      width: `${(d.box.x2 - d.box.x1) * 100}%`,
      height: `${(d.box.y2 - d.box.y1) * 100}%`
    })
    let label = document.createElement("div")
    label.className = "walk-box-label"
    label.textContent = `${d.object} ${Math.round(d.confidence * 100)}%`
    box.appendChild(label)
    overlay.appendChild(box)
  })
}

function walkBoxesMain() {
  if (!WALK_SHOW_BOXES && !new URLSearchParams(window.location.search).has("boxes")) return

  let style = document.createElement("style")
  style.textContent = `
    .walk-boxes { position: absolute; pointer-events: none; z-index: 3; }
    .walk-box { position: absolute; box-sizing: border-box; border: 2px solid #ff3b30; }
    .walk-box-label {
      position: absolute; left: -2px; bottom: 100%;
      padding: 0 0.3rem; font-size: 0.7rem; line-height: 1.4; white-space: nowrap;
      color: white; background: #ff3b30;
    }
  `
  document.head.appendChild(style)

  let img = document.querySelector("#featured-image")
  img.addEventListener("load", walkBoxesDraw)
  new ResizeObserver(walkBoxesDraw).observe(img)
}
