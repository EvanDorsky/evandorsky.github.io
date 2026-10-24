(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

// hack in the modulo operator
// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
Number.prototype.mod = function (n) {
  "use strict"
  return ((this % n) + n) % n
}

// global state set when a feature is opening or closing
featureLock = false

// figure out which "feature" an element is associated with
function classnameFromSelEl(el) {
  var classes = el.attr("class").split(" ")

  // filter out classes we don't care about
  var classesFilt = classes.filter((c) => c.includes("feature-"))

  // the class will be in the form "feature-name-line"
  // so get rid of the "line" suffix

  return classesFilt[0].replace(/-line$/g, '')
}

function getSelDetailBox() {
  var curSelEl = d3.selectAll(".selected").filter(".feature")

  if (!curSelEl.empty()) {
    var selQuery = "."+classnameFromSelEl(curSelEl)
    return document.querySelector(selQuery)
  }
  return null
}

function scrollToKeyline(sel) {
  // padding above the element to scroll to
  var padding = 6

  var curScroll = document.querySelector("html").scrollTop
  var newSelPos = document.querySelector(sel).getBoundingClientRect().y

  // if an element is currently selected, need to account for it
  var scrollTarget = curScroll + newSelPos - padding

  // get the currently selected detail box, if there is one
  var curSelDetailBox = getSelDetailBox()

  if (curSelDetailBox) {
    var box = curSelDetailBox.getBoundingClientRect()
    var curSelY = box.y

    // if the new scroll target (the "key-line") is below the currently selected detail box
    if (newSelPos > curSelY) {
      scrollTarget -= box.height
    }
  }
  d3.transition()
    .duration(500)
    .tween("scroll", __scrollTween(scrollTarget))
}

function keyphraseClick(event) {
  var id = d3.select(this).attr("id")
  keyphraseOpen(id)
}

function imgClick(event) {
  var imName = d3.select(this).attr("name")
  return presentModal(imName)
}

function presentModal(name) {
  var modal = d3.selectAll(`.photo-modal-bg[name='${name}']`)

  if (!modal.classed('active')) {
    modal.classed('active', true)
    window.modal = modal
  }
  if (window.mode != Mode.modal) {
    updateMode(Mode.modal)
  }
}

function updateMode(newMode) {
  var lastmode = window.mode
  window.mode = newMode
  if (window.mode != Mode.modal) {
    window.modal = null
  }
  if (window.mode == Mode.modal) {
    d3.selectAll('.gallery-modal-bg').classed('active', true)
  }
  if (lastmode == Mode.modal) {
    d3.selectAll('.gallery-modal-bg').classed('active', false)
  }
}

function dismissModal(event, complete=false) {
  window.modal.classed('active', false)

  if (complete) {
    updateMode(Mode.default)
  }
}

function keyphraseOpen(id, doScroll=true, openTo=-1) {
  var sel_detailBox = "."+id
  var sel_keyline   = sel_detailBox+"-line"
  var sel_keyphrase = "#"+id

  var wasSelected = d3.select(sel_detailBox).classed("selected")

  // 0. if we happen to be opening a feature at this moment,
  //    don't do anything
  if (featureLock) {
    return
  }

  if (doScroll) {
    // 1. scroll to the clicked line
    scrollToKeyline(sel_keyline)
  }

  // 2. close any open features
  selectorClose(".feature", id)

  // 3. deselect any selected lines
  selectorDeselect(".key-phrase")

  // 4. open the feature, if it wasn't already open
  if (!wasSelected) {
    selectorOpen(sel_detailBox, id, openTo)
    selectorSelect(sel_keyphrase)
  }
}

function doHint() {
  // briefly reveal a feature section
  setTimeout(()=>{
    keyphraseOpen("apple-spg", false, 100)

    setTimeout(()=> {
      keyphraseOpen("apple-spg", false)
    }, 1200)
  }, 1500)

  setTimeout(()=>{
    d3.selectAll('.key-phrase').classed('hint', true)
    setTimeout(()=>{
      d3.selectAll('.key-phrase').classed('hint', false)
    }, 200)
    setTimeout(()=>{
      d3.selectAll('.key-phrase').classed('hint', true)
    }, 400)
    setTimeout(()=>{
      d3.selectAll('.key-phrase').classed('hint', false)
    }, 600)
  }, 1600)
}

function selectorSelect(sel) {
  var els = d3.selectAll(sel)
  els.classed('selected', true)
}

function selectorDeselect(sel) {
  var els = d3.selectAll(sel)
  els.classed('selected', false)
}

function selectorOpen(sel, id, openTo) {
  var els = d3.selectAll(sel)
  els.style('display', 'block')
     .style('height', 'auto')
  var detailHeight = document.querySelector("."+id).offsetHeight
  els.style('height', 0)

  var openHeight = detailHeight
  if (openTo != -1) {
    openHeight = openTo
  }

  featureLock = true
  setTimeout(()=>{
    selectorSelect(sel)

    // specify properties to transition to
    els.style('height', openHeight+'px')
       .style('margin-top', '1rem')

    setTimeout(()=>{
        selectorSelect(sel)

        if (openTo == -1) {
          els.style('height', 'auto')
        }

        featureLock = false
    }, 505)
  }, 5)
}

// carousel functions

function carouselButtonClick(cn, e) {
  var c = window.carousels[cn]
  if (window.carousels[cn].carouselInterval) {
    clearInterval(window.carousels[cn].carouselInterval)
  }

  var el = d3.select(e.target)
  var dir = el.attr("dir")

  var newIdx = (c.idx + parseInt(dir)).mod(c.len)
  carouselSelect(cn, newIdx)
}

function carouselSelect(cn, idx) {
  console.log(`Select idx ${idx}`)
  console.log('=============')
  var c = window.carousels[cn]

  var el = d3.select(`.scroller#${cn}`)

  var items = el.selectAll('.scroller-item:not(.placeholder)')
  var item = items.nodes()[idx]

  // fade out the current item
  // console.log(d3.select(items).classed('active'))

  var activeItems = el.selectAll(".scroller-item.active")
    .filter(function () { return this !== item })
  console.log('1. select activeItems')
  console.log(activeItems._groups[0])
  if (activeItems) {
    console.log('2.   set activeItems hiding')
    activeItems.classed('hiding', true)
  }
  console.log('3. set new item activating')
  console.log(item)
  d3.select(item).classed('hiding', false)
  d3.select(item).classed('activating', true)

  setTimeout(function () {
    console.log('5. set new item active')
    console.log(item)
    d3.select(item).classed('activating', false)
    d3.select(item).classed('active', true)
  }, 0)

  setTimeout(function () {
    console.log('4. unset activeItems hiding')
    console.log(activeItems)
    var current = items.nodes()[c.idx]
    var staleItems = activeItems.filter(function () { return this !== current })
    staleItems.classed('hiding', false)
    staleItems.classed('active', false)
  }, 500)
  

  window.carousels[cn].idx = idx
}

function selectorClose(sel, id) {
  var els = d3.selectAll(sel)

  var detailBox = getSelDetailBox()
  if (detailBox) {
    var detailHeight = detailBox.offsetHeight

    els.style('height', detailHeight+'px')
  }
  featureLock = true
  setTimeout(()=>{
    // specify properties to transition to
    els.style('height', 0)
       .style('margin-top', '0')
    selectorDeselect(sel)
  }, 5)

  setTimeout(()=>{
    featureLock = false
  }, 505)
}

function __scrollTween(offset) {
  return function() {
    var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset)
    return function(t) { window.scrollTo(0, i(t)); }
  }
}

const Mode = {
  default: 0,
  modal: 1
}

function bodyKeydown(event) {
  if (window.mode == Mode.modal) {
    if (event.keyCode == '39') {
      // right arrow
      stepModal(1)
    }
    else if (event.keyCode == '37') {
      // left arrow
      stepModal(-1)
    }
    else {
      return dismissModal(event, true)
    }
  }
}

// show the previous (-1) or next (1) photo of the open modal's series, if there is one
function stepModal(indexChange) {
  var series = window.modal.attr("series")
  var gallery = d3.selectAll(`.fj-gallery[series='${series}']`)
  var maxphotos = gallery.attr("n_photos")

  var newNum = parseInt(window.modal.attr("index")) + indexChange

  if (0 < newNum && newNum <= maxphotos) {
    var newModal = d3.selectAll(`.photo-modal-bg[index='${newNum}'][series='${series}']`)
    dismissModal()

    setTimeout(() => presentModal(newModal.attr("name")), 0)
  }
}

// tap zones on the open modal: left third = previous, right third = next, middle = close
function modalZone(event) {
  var x = event.clientX / window.innerWidth
  return x < 1/3 ? -1 : (x > 2/3 ? 1 : 0)
}

function modalClick(event) {
  // a swipe can leave a click behind; it already stepped
  if (Date.now() - window.modalSwipedAt < 350) {
    return
  }
  var zone = modalZone(event)
  if (zone == 0) {
    return dismissModal(event, true)
  }
  stepModal(zone)
}

function modalMousemove(event) {
  var zone = modalZone(event)
  this.style.cursor = zone < 0 ? "w-resize" : (zone > 0 ? "e-resize" : "zoom-out")
}

// a horizontal swipe steps too: swipe left = next, swipe right = previous
const SWIPE_MIN_PX = 50

function modalTouchstart(event) {
  window.modalTouch = event.touches.length == 1
    ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
    : null
}

function modalTouchend(event) {
  var start = window.modalTouch
  window.modalTouch = null
  if (!start || event.changedTouches.length != 1) {
    return
  }
  // leave pinch-zoomed panning alone
  if (window.visualViewport && window.visualViewport.scale > 1.01) {
    return
  }
  var dx = event.changedTouches[0].clientX - start.x
  var dy = event.changedTouches[0].clientY - start.y
  if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < 1.5 * Math.abs(dy)) {
    return
  }
  window.modalSwipedAt = Date.now()
  event.preventDefault()
  stepModal(dx < 0 ? 1 : -1)
}

async function emailFormSubmit(e) {
  e.preventDefault()

  const endpoint = "https://5bifdqvhuf.execute-api.us-east-2.amazonaws.com/default/emailListAdd"

  const inputEl = d3.select(e.target).select("input#email")
  const email = inputEl.property("value")

  inputEl.property("value", "")
  inputEl.attr("placeholder", "Submitting...")

  const response = await fetch(endpoint, {
    method: "POST",
    mode: 'no-cors',
    body: JSON.stringify({email: email})
  })

  console.log(`Add email address: ${email}`)
  console.log(response)

  inputEl.attr("placeholder", "Thank you!")
}

function disclaimerSetup() {
  d3.select(".disclaimer-toggle").on("click", disclaimerShow)
}

function disclaimerShow() {
  d3.select(".disclaimer-text").classed("active", true)
  d3.select(".disclaimer-toggle").classed("active", true)
}

function main(event) {
  d3.select("form#email").on("submit", emailFormSubmit)

  disclaimerSetup()

  window.mode = Mode.default
  window.modal = ""
  // restore display: flex
  // (gallery is set to display: none
  // on load to prevent popping)
  // d3.select('.gallery')
    // .style('display', 'flex')

  // key phrase click event
  d3.selectAll(".key-phrase")
    .on("click", keyphraseClick)

  // make all links open in new windows
  // d3.selectAll("a")
  //   .attr("target", "_blank")

  // modal popup
  d3.selectAll(".fj-gallery-item")
    .select("img")
    .on("click", imgClick)

  // modal: tap/click left or right to step, middle to dismiss; swipe to step
  window.modalSwipedAt = 0
  d3.selectAll(".photo-modal-bg")
    .on("click", modalClick)
    .on("mousemove", modalMousemove)
    .on("touchstart", modalTouchstart, { passive: true })
    .on("touchend", modalTouchend)

  // modal dismiss
  d3.select('body')
    .on("keydown", bodyKeydown)

  // masonry setup
  var grid = document.querySelector('.grid')
  var msnry = new Masonry(grid, {
      itemSelector: '.grid-item',
      columnWidth: 300,
      gutter: 30,
      horizontalOrder: true
    })

  imagesLoaded(grid, function() {
    msnry.layout()
  })

  // gallery setup
  if (!window.galleriesHandledElsewhere) {

    // window.galleryRowHeight = 250
    var galleryRowTol = 0.3
    if (window.galleryRowTol) {
      galleryRowTol = window.galleryRowTol
    }
    var galleryLastRow = "left"
    if (window.galleryLastRow) {
      galleryLastRow = window.galleryLastRow
    }

    for (let id in window.galleries) {
      let info = window.galleries[id]
      // var res = fjGallery(document.querySelectorAll(`#${id}`), {
      //   itemSelector: '.fj-gallery-item',
      //   transitionDuration: 0,
      //   gutter: parseInt(info.gutter),
      //   rowHeight: info.row_height,
      //   rowHeightTolerance: galleryRowTol,
      //   lastRow: galleryLastRow,
      //   calculateItemsHeight: true
      // });


      // masonry setup
      var grid = document.querySelector(`#${id}`)
      console.log('grid')
      console.log(grid)
      var msnry = new Masonry(grid, {
          itemSelector: '.fj-gallery-item',
          columnWidth: '.fj-gallery-item',
          gutter: 10,
          transitionDuration: 0
          // horizontalOrder: true
        })

      imagesLoaded(grid, function() {
        msnry.layout()

        window.addEventListener("resize", e => {
          msnry.layout()
        })
      })
    }
  }

  // carousel setup
  for (let cn in window.carousels) {
    var el = d3.select(`.scroller#${cn}`)

    d3.select(el.node()).selectAll('.button')
      .on("click", (e) => carouselButtonClick(cn, e))

    carouselSelect(cn, 0)

    // setTimeout(() => el.selectAll('.scroller-item').classed('transition-all', true), 800)

    if (window.carousels[cn].auto_advance) {
      window.carousels[cn].carouselInterval = setInterval(() => carouselSelect(cn, ((window.carousels[cn].idx+1).mod(window.carousels[cn].len))), 6000)
    }
  }

  // run the "hint" to indicate clickable elements
  // doHint()
}