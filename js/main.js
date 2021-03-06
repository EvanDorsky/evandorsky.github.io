(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

// global state set when a feature is opening or closing
featureLock = false

// figure out which "feature" an element is associated with
function idFromSelEl(el) {
  var classes = el.attr("class").split(" ")

  // filter out classes we don't care about
  var classesFilt = classes.filter((c) => c != "selected" && c != "key-line")

  // the class will be in the form "feature-name-line"
  // so get rid of the "line" suffix

  return classesFilt[0].replace(/-line$/g, '')
}

function getSelDetailBox() {
  var curSelEl = d3.selectAll(".selected").filter(".key-line")
  if (!curSelEl.empty()) {
    var selQuery = "."+idFromSelEl(curSelEl)
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

  // get the currently selected detailed box, if there is one
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
  setTimeout(()=>{
    keyphraseOpen("apple-spg", false, 200)
    setTimeout(()=> {
      keyphraseOpen("apple-spg", false)
    }, 900)
  }, 1500)
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

function main(event) {
    d3
      .selectAll(".key-phrase")
      .on("click", keyphraseClick)

    // make all links open in new windows
    d3.selectAll("a")
      .attr("target", "_blank")

    // run the "hint" to indicate clickable elements
    doHint()
}