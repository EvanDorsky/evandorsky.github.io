(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

function keyphrase_click(event) {
  var id = d3.select(this).attr("id")

  var sel         = "."+id
  var sel_keyline = "."+id+"-line"

  var wasSelected = d3.select(sel).classed("selected")

  selector_close(".feature", id)
  selector_deselect(".key-line")
  if (!wasSelected) {
    selector_open(sel, id)
    selector_select(sel_keyline)
  }
}

function selector_select(sel) {
  var els = d3.selectAll(sel)
  els.classed('selected', true)
}

function selector_deselect(sel) {
  var els = d3.selectAll(sel)
  els.classed('selected', false)
}

function selector_open(sel, id) {
  var els = d3.selectAll(sel)
  els.style('display', 'block')
     .style('height', 'auto')
  var detailHeight = document.querySelector("."+id).offsetHeight
  els.style('height', 0)
  setTimeout(function() {
      selector_select(sel)

      els.style('height', detailHeight+'px')
  }, 5)
}

function selector_close(sel, id) {
  var els = d3.selectAll(sel)
  els.style('height', 0)

  selector_deselect(sel)
}

function main(event) {
    d3
      .selectAll(".key-phrase")
      .on("click", keyphrase_click)
}