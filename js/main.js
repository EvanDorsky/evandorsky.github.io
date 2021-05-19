(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

function keyphrase_click(event) {
  var id = d3.select(this).attr("id")

  var sel = "."+id

  var wasSelected = d3.select(sel).classed("selected")

  selector_close(".feature", id)
  if (!wasSelected) {
    selector_open(sel, id)
  }
}

function selector_open(sel, id) {
  var els = d3.selectAll(sel)
  els.style('display', 'block')
    .style('height', 'auto')
  var detailHeight = document.querySelector("."+id).offsetHeight
  els.style('height', 0)
  setTimeout(function() {
      els.classed('selected', true)
        .style('height', detailHeight+'px')
  }, 5)
}

function selector_close(sel, id) {
  var els = d3.selectAll(sel)
  els.style('height', 0)
    .classed('selected', false)
}

function main(event) {
    d3
      .selectAll(".key-phrase")
      .on("click", keyphrase_click)
}