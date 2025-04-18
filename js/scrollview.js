(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()


function main(event) {
  gsap.registerPlugin(ScrollTrigger)

  gsap.to(".scroller-sidebar", {
    scrollTrigger: {
      trigger: ".scroller-sidebar",
      start: "top top",
      pin: true,
      // markers: true
    }
  })
  // ScrollTrigger.create({
  //   trigger: ".sidebar.photo-page",
  //   start: "top top",
  //   pin: true,
  //   markers: true
  // })
}