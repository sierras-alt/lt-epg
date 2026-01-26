function isToday(dateStr) {
  const y = +dateStr.substr(0, 4);
  const m = +dateStr.substr(4, 2) - 1;
  const d = +dateStr.substr(6, 2);

  const today = new Date();

  return (
    y === today.getFullYear() && m === today.getMonth() && d === today.getDate()
  );
}

function getLietuviuDiena(dateStr) {
  const dienos = ["Sk", "Pr", "An", "Tr", "Kt", "Pn", "Št"];
  if (isToday(dateStr)) return "Šiandien";

  const y = +dateStr.substr(0, 4);
  const m = +dateStr.substr(4, 2) - 1;
  const d = +dateStr.substr(6, 2);

  const dayToCheck = new Date(y, m, d, 12, 0, 0);
  return dienos[dayToCheck.getDay()];
}

function updateDateDisplays(dateStringFromButton) {
  const dateDisplay1 = document.querySelector("#current-date-display");
  const dateDisplay2 = document.querySelector("#current-date-display-2");

  if (!dateDisplay1 && !dateDisplay2) return;

  let dateToDisplay;

  if (dateStringFromButton) {
    const y = +dateStringFromButton.substr(0, 4);
    const m = +dateStringFromButton.substr(4, 2) - 1;
    const d = +dateStringFromButton.substr(6, 2);
    dateToDisplay = new Date(y, m, d, 12, 0, 0);
  } else {
    dateToDisplay = new Date();
  }

  let weekday = dateToDisplay.toLocaleDateString("lt-LT", { weekday: "long" });
  weekday = weekday.charAt(0).toUpperCase() + weekday.slice(1);

  let dateStr = dateToDisplay.toLocaleDateString("lt-LT", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const parts = dateStr.split(/[\.\-\/]/);
  if (parts.length === 3) {
    dateStr = `${parts[0]}.${parts[1]}.${parts[2]}`;
  }

  const content = `${weekday} <br /><small>${dateStr}</small>`;

  if (dateDisplay1) dateDisplay1.innerHTML = content;
  if (dateDisplay2) dateDisplay2.innerHTML = content;
}

function displayCurrentDate() {
  updateDateDisplays();
}

function centerActiveDay(dateStr) {
  const container = document.querySelector("#days-nav");
  if (!container) return;

  setTimeout(() => {
    const activeButton = container.querySelector(`[data-date="${dateStr}"]`);
    if (!activeButton) return;

    const containerWidth = container.clientWidth;
    const containerScrollWidth = container.scrollWidth;
    const buttonOffsetLeft = activeButton.offsetLeft;
    const buttonWidth = activeButton.offsetWidth;

    let scrollLeft = buttonOffsetLeft - containerWidth / 2 + buttonWidth / 2;

    if (scrollLeft < 0) scrollLeft = 0;
    const maxScroll = containerScrollWidth - containerWidth;
    if (scrollLeft > maxScroll) scrollLeft = maxScroll;

    container.scroll({
      left: scrollLeft,
      behavior: "smooth",
    });
  }, 0);
}

function renderDaysNavDayMenu(programmes) {
  if (!programmes || programmes.length === 0) return;

  displayCurrentDate();

  const daysNav = document.querySelector("#days-nav");
  if (!daysNav) return;
  daysNav.innerHTML = "";

  const datesSet = new Set();
  programmes.forEach((prg) => prg.date && datesSet.add(prg.date));
  const uniqueDates = [...datesSet].sort();

  const today = new Date();
  const todayDateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

  const initialSelectedDate = uniqueDates.includes(todayDateStr)
    ? todayDateStr
    : uniqueDates[0];

  uniqueDates.forEach((date) => {
    const label = getLietuviuDiena(date);
    const dayOfMonth = date.substr(6, 2);
    const isActive = date === initialSelectedDate ? " active" : "";
    const isTodayClass = isToday(date) ? " today-btn" : "";

    daysNav.innerHTML += `
      <button class="day${isActive}${isTodayClass}" data-date="${date}">
        <span>${label}</span>
        <span>${dayOfMonth}</span>
      </button>
    `;
  });

  updateDateDisplays(initialSelectedDate);

  if (typeof setSelectedDate === "function")
    setSelectedDate(initialSelectedDate);

  setTimeout(() => {
    const todayButton = daysNav.querySelector(".today-btn");
    if (todayButton) {
      centerActiveDay(todayButton.dataset.date);
    } else {
      centerActiveDay(initialSelectedDate);
    }
  }, 200);
}

document.addEventListener("click", (e) => {
  const targetButton = e.target.closest(".day");
  if (!targetButton) return;

  document
    .querySelectorAll("#days-nav .day")
    .forEach((button) => button.classList.remove("active"));
  targetButton.classList.add("active");

  const newDate = targetButton.dataset.date;
  updateDateDisplays(newDate);

  setTimeout(() => centerActiveDay(newDate), 50);

  if (typeof setSelectedDate === "function") setSelectedDate(newDate);
  if (typeof renderChannels === "function") renderChannels();
});

window.addEventListener("resize", () => {
  const active = document.querySelector("#days-nav .day.active");
  if (active) {
    clearTimeout(window._resizeTimer);
    window._resizeTimer = setTimeout(() => {
      centerActiveDay(active.dataset.date);
    }, 200);
  }
});
