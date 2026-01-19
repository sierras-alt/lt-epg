// rodykle.js (PATAISYTA ADAPTYVI VERSIJA BE SCROLL)

document.addEventListener('DOMContentLoaded', () => {
	const leftArrow = document.querySelector('.bi-chevron-left');
	const rightArrow = document.querySelector('.bi-chevron-down');

	// Patikriname, ar globalūs kintamieji/funkcijos yra prieinami
	if (typeof allUniqueDates === 'undefined' || typeof updateVisibleDays === 'undefined') {
		// Tai rodo, kad daymenu.js nebuvo įkeltas arba įkeltas po rodykle.js
		console.error(
			'Klaida: daymenu.js globalūs kintamieji/funkcijos nepasiekiami. Patikrinkite įkėlimo tvarką.',
		);
		return;
	}

	function changeDay(direction) {
		// Randame aktyvios dienos datą iš matomų mygtukų
		const activeDate = document.querySelector('.days-nav .day.active')?.dataset.date;
		if (!activeDate) return;

		// Randame aktyvios dienos indeksą BENDRAME datų sąraše
		let activeIndex = allUniqueDates.indexOf(activeDate);
		if (activeIndex === -1) activeIndex = 0;

		let newIndex = activeIndex;

		// Perjungiam indeksą
		if (direction === 'prev' && activeIndex > 0) {
			newIndex = activeIndex - 1;
		} else if (direction === 'next' && activeIndex < allUniqueDates.length - 1) {
			newIndex = activeIndex + 1;
		} else {
			// Pasiekta sąrašo riba
			return;
		}

		const newDate = allUniqueDates[newIndex];

		// Atnaujiname rodomas dienas, kad nauja diena taptų aktyvi ir matoma
		if (typeof updateVisibleDays === 'function') updateVisibleDays(newDate);

		// Perduoti naują datą į epg.js
		if (typeof setSelectedDate === 'function') setSelectedDate(newDate);

		// Perpiešti kanalus
		if (typeof renderChannels === 'function') renderChannels();
	}

	// Kairė rodyklė — ankstesnė diena
	if (leftArrow) {
		leftArrow.parentElement.addEventListener('click', (e) => {
			e.preventDefault();
			changeDay('prev');
		});
		// Kairės rodyklės piktogramos HTML naudojamas klaidingas viewBox, bet kodo nekeičiame
	}

	// Dešinė rodyklė — kita diena
	if (rightArrow) {
		rightArrow.parentElement.addEventListener('click', (e) => {
			e.preventDefault();
			changeDay('next');
		});
		// Dešinės rodyklės piktogramos HTML yra bi-chevron-down (žemyn), bet kodo nekeičiame
	}
});
