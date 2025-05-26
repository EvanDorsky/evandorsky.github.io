(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

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

    return (leaveInfo) => {
      title.classed("active", false)
    }
  }, {
    amount: 0.6,
    margin: scrollDetectMargin
  })

  // highlight header too
  m.inView(".inner-list", (el, enterInfo) => {
    const slug = el.getAttribute("slug")
    const title = d3.select(`.pj-list-header[slug="${slug}"]`)
    title.classed("active", true)

    return (leaveInfo) => {
      title.classed("active", false)
    }
  }, { margin: scrollDetectMargin })

  // document.addEventListener("scroll", () => {
  //   if (!isScrollingToPost) {
  //     scrollerSide.scrollTop = scrollScale(doc.scrollTop)
  //   }
  // })

  // click title to scroll to post
  d3.selectAll(".pj-list-item")
    .on("click", (e) => {
      const slug = e.target.getAttribute("slug")

      const post = d3.select(`.collection-post-preview-vert[slug="${slug}"]`)
      const target = post.node()
      const targetPos = target.offsetTop - 25

      const delta = doc.scrollTop - targetPos

      isScrollingToPost = true
      m.animate(doc.scrollTop, targetPos, {
        duration: Math.abs(1e-4 * delta),
        easing: "ease-in-out",
        onUpdate: latest => doc.scrollTop = latest,
        onComplete: () => {
          isScrollingToPost = false
        }
      })
    })

}