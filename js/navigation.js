// Apsauga, jei funkcijos neegzistuoja (pvz., epg.js dar neįkeltas)
if (typeof setSelectedCategory !== 'function') {
	window.setSelectedCategory = function (category) {
		console.log(`Kategorija nustatyta į: ${category} (NETIKRA setSelectedCategory funkcija)`);
	};
}

if (typeof renderChannels !== 'function') {
	window.renderChannels = function () {
		console.log('Kanalai atnaujinami (NETIKRA renderChannels funkcija)');
	};
}

// ------------------------------------------------------
// Funkcija, kuri SINCHRONIZUOJA tik aktyvias klases (CSS)
// Ši funkcija reikalinga, kad abiejų navigacijų mygtukai atrodytų vienodai
// ------------------------------------------------------
function syncActiveClasses(category) {
	const categoryUpper = category.toUpperCase();

	// Sinchronizuoja headerio nuorodas
	document.querySelectorAll('.nav a').forEach((link) => {
		link.classList.remove('active');
		if (link.textContent.trim().toUpperCase() === categoryUpper) {
			link.classList.add('active');
		}
	});

	// Sinchronizuoja apatinius mygtukus
	window.document.querySelectorAll('.categories-nav .cat').forEach((button) => {
		button.classList.remove('active');
		if (button.dataset.cat.toUpperCase() === categoryUpper) {
			button.classList.add('active');
		}
	});
}

// ------------------------------------------------------
// Priskiriame įvykių klausytojus headerio nuorodoms
// ------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
	const headerLinks = document.querySelectorAll('.nav a');
	const categoriesNav = document.querySelector('#categories-nav'); // Apatinė kategorijų nav

	headerLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			e.preventDefault();

			const category = this.textContent.trim().toUpperCase();

			// 1. Surandame atitinkamą mygtuką apatinėje navigacijoje
			const targetButton = categoriesNav.querySelector(`[data-cat="${category}"]`);

			if (targetButton) {
				// 2. Sinchronizuojame aktyvias klases VIZUALIAI
				syncActiveClasses(category);

				// 3. Sukuriame ir paleidžiame paspaudimo įvykį (CLICK event)
				// Šis veiksmas priverčia apatinį mygtuką atlikti EPG atnaujinimo logiką
				targetButton.click();
			} else {
				console.warn(`Nerastas atitinkamas categories-nav mygtukas kategorijai: ${category}`);
			}

			// 4. Uždaryti burgerio meniu (jei aktyvus), naudojant jūsų burger.js logiką
			const burger = document.querySelector('.burger');
			const nav = document.querySelector('#nav');
			if (burger && nav && burger.classList.contains('open')) {
				burger.classList.remove('open');
				nav.classList.remove('open');
			}
		});
	});

	// ------------------------------------------------------
	// Kategorijų mygtukų klausytojai: Turi naudoti tą pačią syncActiveClasses!
	// Tai užtikrins, kad paspaudus apačioje, pasikeistų ir headerio nuoroda.
	// ------------------------------------------------------
	const categoryButtons = document.querySelectorAll('.categories-nav .cat');
	categoryButtons.forEach((button) => {
		button.addEventListener('click', function () {
			const category = this.dataset.cat.toUpperCase();

			// Svarbu: Pirmiausia sinchronizuojame KLASE
			syncActiveClasses(category);

			// Antra: Atnaujiname kategoriją ir kanalus (šią logiką, matyt, jau atlieka
			// mygtuko įvykis JŪSŲ epg.js faile. Jei ne, atkomentuokite žemiau:)
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

	// Pradinis sinchronizavimas užkraunant puslapį
	const initialActiveLink = document.querySelector('.nav a.active');
	if (initialActiveLink) {
		syncActiveClasses(initialActiveLink.textContent.trim().toUpperCase());
	}
});
