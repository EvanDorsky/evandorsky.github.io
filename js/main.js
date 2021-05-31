(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

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

  var sel_detailBox = "."+id
  var sel_keyline   = sel_detailBox+"-line"

  var wasSelected = d3.select(sel_detailBox).classed("selected")

  scrollToKeyline(sel_keyline)

  selectorClose(".feature", id)
  selectorDeselect(".key-line")
  if (!wasSelected) {
    selectorOpen(sel_detailBox, id)
    selectorSelect(sel_keyline)
  }
}

function selectorSelect(sel) {
  var els = d3.selectAll(sel)
  els.classed('selected', true)
}

function selectorDeselect(sel) {
  var els = d3.selectAll(sel)
  els.classed('selected', false)
}

function selectorOpen(sel, id) {
  var els = d3.selectAll(sel)
  els.style('display', 'block')
     .style('height', 'auto')
  var detailHeight = document.querySelector("."+id).offsetHeight
  els.style('height', 0)
  setTimeout(()=>{
    selectorSelect(sel)

    els.style('height', detailHeight+'px')

    setTimeout(()=>{
        selectorSelect(sel)

        els.style('height', 'auto')
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
  setTimeout(()=>{
    els.style('height', 0)
    selectorDeselect(sel)

  }, 5)
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
}