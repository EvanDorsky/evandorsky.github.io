(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

function main(event) {
  d3.selectAll(".pj-list-item")
    .on("click", (e) => {
      const slug = e.target.getAttribute("slug")

      const post = d3.select(`.collection-post-preview-vert[slug="${slug}"]`)

      const scroller = d3.select("html").node()
      const target = post.node()
      const targetPos = target.offsetTop - 25

      const delta = scroller.scrollTop - targetPos
      console.log('delta')
      console.log(delta)
      m.animate(scroller.scrollTop, targetPos, {
        duration: Math.abs(1e-4 * delta),
        easing: "ease-in-out",
        onUpdate: latest => scroller.scrollTop = latest
      })
    })
    
}