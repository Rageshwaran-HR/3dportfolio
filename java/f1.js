const parallaxElements = document.querySelectorAll(".parallax");
let xValue = 0;
let yValue = 0;

function update(cursorX, cursorY) {
  parallaxElements.forEach((el) => {
    let speedx = parseFloat(el.dataset.speedx);
    let speedy = parseFloat(el.dataset.speedy);
    let speedz = parseFloat(el.dataset.speedz);
    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

    let xTranslate = -xValue * speedx;
    let yTranslate = -yValue * speedy;
    let zTranslate =
      (cursorX - parseFloat(getComputedStyle(el).left)) *
      isInLeft *
      0.1 *
      speedz;

    el.style.transform = `translateX(calc(-50% + ${xTranslate}px)) translateY(calc(-50% + ${yTranslate}px)) translateZ(${zTranslate}px)`;
  });
}

update(0, 0);

window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;
  update(e.clientX, e.clientY);
});

/* gsap animation */

let timeline = gsap.timeline();

Array.from(parallaxElements)
  .filter((el) => !el.classList.contains("text"))
  .forEach((el) => {
    timeline.from(
      el,
      {
        top: `-${el.offsetHeight + parseFloat(el.dataset.distance)}px`,
        duration: 3.5,
        ease: "power3.out",
      },
      "1"
    );
  });
