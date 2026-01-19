document.addEventListener('DOMContentLoaded', () => {
	const burger = document.querySelector('.burger');
	const nav = document.querySelector('.nav');

	// Patikrina, ar abu elementai egzistuoja, kad išvengtume klaidų
	if (burger && nav) {
		burger.addEventListener('click', function () {
			// Perjungiamos CSS klasės burgeriui (animacijai)
			this.classList.toggle('active');
			// Perjungiamos CSS klasės navigacijai (parodymui/paslėpimui)
			nav.classList.toggle('open');
		});
	}
});
