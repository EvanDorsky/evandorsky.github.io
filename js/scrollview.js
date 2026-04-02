(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

function sidebarScrollToSlug(scrollerSide, slug, duration) {
  const title = d3.select(`.pj-list-item[slug="${slug}"]`)
  title.classed("active", true)

  const target = title.node()
  const targetPos = target.offsetTop - 200
  m.animate(scrollerSide.scrollTop, targetPos, {
      duration: duration,
      easing: "ease-in-out",
      onUpdate: latest => scrollerSide.scrollTop = latest
    })
}

function main(event) {
  const scrollerSide = d3.select(".sidebar-inner-scroll").node()
  const doc = document.documentElement

  const scrollScale = d3.scaleLinear()
    .domain([0, doc.scrollHeight - doc.clientHeight])
    .range([0, scrollerSide.scrollHeight - scrollerSide.clientHeight])

  let isScrollingToPost = false

  const scrollDetectMargin = "-100px 0px -100px 0px"

  // highlight list based on in-view posts
  m.inView(".collection-post-preview-vert", (el, enterInfo) => {
    const slug = el.getAttribute("slug")
    const title = d3.select(`.pj-list-item[slug="${slug}"]`)
    title.classed("active", true)

    if (!isScrollingToPost) {
      sidebarScrollToSlug(scrollerSide, slug, 0.2)
    }

    return (leaveInfo) => {
      title.classed("active", false)
    }
  }, {
    amount: 0.6, // what does amount do lol
    margin: scrollDetectMargin
  })

  // highlight header too
  // I think this is doing the wrong thing
  m.inView(".inner-list", (el, enterInfo) => {
    const slug = el.getAttribute("slug")
    const title = d3.select(`.pj-list-header[slug="${slug}"]`)
    title.classed("active", true)

    return (leaveInfo) => {
      title.classed("active", false)
    }
  }, { margin: scrollDetectMargin })

  // click title to scroll to post
  d3.selectAll(".pj-list-item")
    .on("click", (e) => {
      const slug = e.target.getAttribute("slug")

      const post = d3.select(`.collection-post-preview-vert[slug="${slug}"]`)
      const target = post.node()
      const targetPos = target.offsetTop - 25

      const delta = doc.scrollTop - targetPos
      const duration = Math.abs(1e-4 * delta)

      isScrollingToPost = true
      sidebarScrollToSlug(scrollerSide, slug, duration)
      m.animate(doc.scrollTop, targetPos, {
        duration: duration,
        easing: "ease-in-out",
        onUpdate: latest => doc.scrollTop = latest,
        onComplete: () => {
          isScrollingToPost = false
        }
      })
    })

}