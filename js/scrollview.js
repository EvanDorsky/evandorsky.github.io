(
  function() {
    document.addEventListener("DOMContentLoaded", main)
  }
)()


function main(event) {
  gsap.registerPlugin(ScrollTrigger)

  // gsap.to(".sidebar.photo-page", {
  //   scrollTrigger: {
  //     trigger: ".sidebar.photo-page",
  //     start: "top top",
  //     pin: true,
  //     markers: true
  //   }
  // })
  // ScrollTrigger.create({
  //   trigger: ".sidebar.photo-page",
  //   start: "top top",
  //   pin: true,
  //   markers: true
  // })
}