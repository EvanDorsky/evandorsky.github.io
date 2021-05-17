(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

function keyphrase_click(event) {
  var id = d3.select(this).attr("id")

  var isSelected = d3.select("."+id)
    .classed("selected")
  d3.select("."+id)
    .classed("selected", !isSelected)
}

function main(event) {
    d3
      .selectAll(".key-phrase")
      .on("click", keyphrase_click)
}