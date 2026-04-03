(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()

function sidebarScrollToSlug(scrollerSide, uid, duration) {
  const title = d3.select(`.pj-list-item[uid="${uid}"]`)
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
  const transitionDuration = 0.25

  const scrollerSide = d3.select(".sidebar-inner-scroll").node()
  const doc = document.documentElement

  const scrollScale = d3.scaleLinear()
    .domain([0, doc.scrollHeight - doc.clientHeight])
    .range([0, scrollerSide.scrollHeight - scrollerSide.clientHeight])

  let isScrollingToPost = false

  const scrollDetectMargin = "-100px 0px -100px 0px"

  // highlight list based on in-view posts
  m.inView(".collection-post-preview-vert", (el, enterInfo) => {
    const uid = el.getAttribute("uid")
    const title = d3.select(`.pj-list-item[uid="${uid}"]`)
    title.classed("active", true)

    if (!isScrollingToPost) {
      sidebarScrollToSlug(scrollerSide, uid, transitionDuration)
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
    const uid = el.getAttribute("uid")
    const title = d3.select(`.pj-list-header[uid="${uid}"]`)
    title.classed("active", true)

    return (leaveInfo) => {
      title.classed("active", false)
    }
  }, { margin: scrollDetectMargin })

  // click title to scroll to post
  const scrollContent = d3.select(".scroll-inner-container")
  const fadeThreshold = 2500 // pixels

  d3.selectAll(".pj-list-item")
    .on("click", (e) => {
      const uid = e.target.getAttribute("uid")

      const post = d3.select(`.collection-post-preview-vert[uid="${uid}"]`)
      const target = post.node()
      const targetPos = target.offsetTop - 25

      const delta = doc.scrollTop - targetPos

      isScrollingToPost = true
      sidebarScrollToSlug(scrollerSide, uid, transitionDuration)

      if (Math.abs(delta) > fadeThreshold) {
        // fade out, jump, fade in
        m.animate(scrollContent.node(), { opacity: 0 }, {
          duration: transitionDuration,
          easing: "ease-in",
          onComplete: () => {
            doc.scrollTop = targetPos
            m.animate(scrollContent.node(), { opacity: 1 }, {
              duration: transitionDuration,
              easing: "ease-out",
              onComplete: () => {
                isScrollingToPost = false
              }
            })
          }
        })
      } else {
        // short distance — smooth scroll as before
        m.animate(doc.scrollTop, targetPos, {
          duration: transitionDuration,
          easing: "ease-in-out",
          onUpdate: latest => doc.scrollTop = latest,
          onComplete: () => {
            isScrollingToPost = false
          }
        })
      }
    })

}