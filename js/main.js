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

function keyphraseClick(event) {
  var id = d3.select(this).attr("id")

  var sel_detailBox = "."+id
  var sel_keyline   = "."+id+"-line"

  var wasSelected = d3.select(sel_detailBox).classed("selected")

  // padding above the element to scroll to
  var padding = 6

  // get the currently selected line, if there is one
  var curSelEl = d3.selectAll(".selected").filter(".key-line")

  var curScroll = document.querySelector("html").scrollTop
  var newSelPos = document.querySelector(sel_keyline).getBoundingClientRect().y

  // if an element is currently selected, need to account for it
  var scrollTarget = curScroll + newSelPos - padding
  if (!curSelEl.empty()) {
    var selQuery = "."+idFromSelEl(curSelEl)
    var curSelDetailBox = document.querySelector(selQuery).getBoundingClientRect()

    var curSelY = curSelDetailBox.y

    // if the new scroll target (the "key-line") is below the currently selected detail box
    if (newSelPos > curSelY) {
      scrollTarget -= curSelDetailBox.height
    }
  }

  selectorClose(".feature", id)
  selectorDeselect(".key-line")
  if (!wasSelected) {
    selectorOpen(sel_detailBox, id)
    selectorSelect(sel_keyline)
  }

  d3.transition()
    .duration(500)
    .tween("scroll", scrollTween(scrollTarget))

}

function scrollTween(offset) {
  return function() {
    var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset)
    return function(t) { window.scrollTo(0, i(t)); }
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
  }, 5)
}

function selectorClose(sel, id) {
  var els = d3.selectAll(sel)
  els.style('height', 0)

  selectorDeselect(sel)
}

function main(event) {
    d3
      .selectAll(".key-phrase")
      .on("click", keyphraseClick)

    // make all links open in new windows
    d3.selectAll("a")
      .attr("target", "_blank")
}