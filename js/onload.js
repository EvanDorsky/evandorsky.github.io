(
  function() {
    document.addEventListener("DOMContentLoaded", onLoad)
  }
)()

function onLoad(event) {
  // hide the gallery to prevent popping while it reflows
  d3.select('.gallery')
    .style('display', 'none')
}