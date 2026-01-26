document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      this.classList.toggle("active");
      nav.classList.toggle("open");
    });
  }
});
