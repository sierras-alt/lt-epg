if (typeof setSelectedCategory !== "function") {
  window.setSelectedCategory = function (category) {
    console.log(
      `Kategorija nustatyta į: ${category} (NETIKRA setSelectedCategory funkcija)`,
    );
  };
}

if (typeof renderChannels !== "function") {
  window.renderChannels = function () {
    console.log("Kanalai atnaujinami (NETIKRA renderChannels funkcija)");
  };
}

function syncActiveClasses(category) {
  const categoryUpper = category.toUpperCase();

  document.querySelectorAll(".nav a").forEach((link) => {
    link.classList.remove("active");
    if (link.textContent.trim().toUpperCase() === categoryUpper) {
      link.classList.add("active");
    }
  });

  window.document.querySelectorAll(".categories-nav .cat").forEach((button) => {
    button.classList.remove("active");
    if (button.dataset.cat.toUpperCase() === categoryUpper) {
      button.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const headerLinks = document.querySelectorAll(".nav a");
  const categoriesNav = document.querySelector("#categories-nav"); // Apatinė kategorijų nav

  headerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const category = this.textContent.trim().toUpperCase();

      const targetButton = categoriesNav.querySelector(
        `[data-cat="${category}"]`,
      );

      if (targetButton) {
        syncActiveClasses(category);

        targetButton.click();
      } else {
        console.warn(
          `Nerastas atitinkamas categories-nav mygtukas kategorijai: ${category}`,
        );
      }

      const burger = document.querySelector(".burger");
      const nav = document.querySelector("#nav");
      if (burger && nav && burger.classList.contains("open")) {
        burger.classList.remove("open");
        nav.classList.remove("open");
      }
    });
  });

  const categoryButtons = document.querySelectorAll(".categories-nav .cat");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.dataset.cat.toUpperCase();

      syncActiveClasses(category);

      /*
            if (typeof setSelectedCategory === 'function') {
                setSelectedCategory(category);
            }
            if (typeof renderChannels === 'function') {
                renderChannels();
            }
            */
    });
  });

  const initialActiveLink = document.querySelector(".nav a.active");
  if (initialActiveLink) {
    syncActiveClasses(initialActiveLink.textContent.trim().toUpperCase());
  }
});
