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
  if (!window.mode == Mode.modal) {
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
  selectorDeselect(".key-line")

  // 4. open the feature, if it wasn't already open
  if (!wasSelected) {
    selectorOpen(sel_detailBox, id, openTo)
    selectorSelect(sel_keyline)
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

  var el = d3.select(`.carousel#${cn}`)

  var items = el.selectAll('.carousel-item')
  var item = items.nodes()[idx]

  // fade out the current item
  // console.log(d3.select(items).classed('active'))

  var activeItems = d3.selectAll(".carousel-item.active")
  console.log('1. select activeItems')
  console.log(activeItems._groups[0])
  if (activeItems) {
    console.log('2.   set activeItems hiding')
    activeItems.classed('hiding', true)
  }

  setTimeout(function () {
    console.log('4. unset activeItems hiding')
    console.log(activeItems)
    activeItems.classed('hiding', false)
    activeItems.classed('active', false)
  }, 500)
  console.log('3. set new item active')
  console.log(item)
  d3.select(item).classed('active', true)

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
    var indexChange = 0
    if (event.keyCode == '39') {
      // right arrow
      indexChange = 1
    }
    else if (event.keyCode == '37') {
      // left arrow
      indexChange = -1
    }
    else {
      return dismissModal(event, true)
    }
    
    if (indexChange != 0) {
      var gallery = d3.selectAll(`.fj-gallery[series='${window.modal.attr("series")}']`)
      var maxphotos = gallery.attr("n_photos")

      var newNum = parseInt(window.modal.attr("index")) + indexChange

      if (0 < newNum && newNum <= maxphotos) {
        var newModal = d3.selectAll(`.photo-modal-bg[index='${newNum}'][series='${window.modal.attr("series")}']`)
        dismissModal()

        setTimeout(() => presentModal(newModal.attr("name")), 0)
      }
    }
  }
}

function main(event) {
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

  // modal dismiss
  d3.selectAll(".photo-modal-bg")
    .on("click", (e) => dismissModal(e, true))

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
    fjGallery(document.querySelectorAll(`#${id}`), {
      itemSelector: '.fj-gallery-item',
      transitionDuration: 0,
      gutter: info.gutter,
      rowHeight: info.row_height,
      rowHeightTolerance: galleryRowTol,
      lastRow: galleryLastRow,
      calculateItemsHeight: true
    });
  }

  // carousel setup
  for (let cn in window.carousels) {
    var el = d3.select(`.carousel#${cn}`)

    d3.select(el.node().parentNode).selectAll('.button')
      .on("click", (e) => carouselButtonClick(cn, e))

    carouselSelect(cn, 0)

    // setTimeout(() => el.selectAll('.carousel-item').classed('transition-all', true), 800)

    if (window.carousels[cn].auto_advance) {
      window.carousels[cn].carouselInterval = setInterval(() => carouselSelect(cn, ((window.carousels[cn].idx+1).mod(window.carousels[cn].len))), 6000)
    }
  }

  // run the "hint" to indicate clickable elements
  // doHint()
}