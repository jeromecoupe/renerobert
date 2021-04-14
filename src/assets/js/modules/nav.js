const navTriggers = document.querySelectorAll(".js-navtrigger");
const touchMenu = document.querySelector(".js-touchmenu");

const init = () => {
  navTriggers.forEach((el) => {
    el.addEventListener(
      "click",
      (event) => {
        touchMenu.classList.toggle("is-active");
        event.preventDefault();
      },
      false
    );
  });
};

export { init };
