document.addEventListener("DOMContentLoaded", () => {
  const daysNav = document.querySelector("#days-nav");
  const currentDateDisplay = document.querySelector("#current-date-display");

  const leftArrow = document.querySelector(".bi-chevron-left");
  const rightArrow = document.querySelector(".bi-chevron-right");

  if (!daysNav) {
    console.warn("Nerastas #days-nav");
    return;
  }

  function changeDay(direction) {
    const days = [...daysNav.querySelectorAll(".day")];
    if (days.length === 0) return;

    let activeIndex = days.findIndex((d) => d.classList.contains("active"));
    if (activeIndex === -1) activeIndex = 0;

    let newIndex = activeIndex;
    if (direction === "prev" && activeIndex > 0) {
      newIndex = activeIndex - 1;
    } else if (direction === "next" && activeIndex < days.length - 1) {
      newIndex = activeIndex + 1;
    } else {
      console.log("Pasiekta sąrašo riba.");
      return;
    }

    days[activeIndex].classList.remove("active");
    const newDay = days[newIndex];
    newDay.classList.add("active");

    const newDate = newDay.dataset.date;
    if (!newDate) return;

    // if (currentDateDisplay) {
    // 	const label = newDay.querySelector('span:first-child')?.textContent || ''
    // 	const num = newDay.querySelector('span:last-child')?.textContent || ''
    // 	currentDateDisplay.innerHTML = `${label}<br><small>${num}</small>`
    // }

    if (typeof setSelectedDate === "function") setSelectedDate(newDate);

    if (typeof renderChannels === "function") renderChannels();

    if (typeof centerActiveDay === "function") centerActiveDay(newDate);
  }

  if (leftArrow) {
    leftArrow.parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      changeDay("prev");
    });
  }

  if (rightArrow) {
    rightArrow.parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      changeDay("next");
    });
  }
});
