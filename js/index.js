window.addEventListener('DOMContentLoaded', () => {
	addEffects();
});

function addEffects() {
	// Title typewriter effect
	typewriter('title', () => {
		document.getElementById('arrow').classList.add('animate');
	});

	animateDescription();
}

function animateDescription() {
	const description = document.getElementById('description');
	const elements = description.children;

	window.addEventListener('scroll', () => {
		for (element of elements) {
			const y = Math.max(window.innerHeight - element.getBoundingClientRect().top - element.getBoundingClientRect().height / 2, 0);
			const percent = y / window.innerHeight * 100;

			const start = { start: 0, length: 50 };
			const end = { start: 50, length: 50 };

			element.style.opacity = 0;

			if (frameRange(start, percent)) {
				const frame = getFrame(start, percent);
				element.style.opacity = frame;
				element.style.transform = `scale(${frame * 0.5 + 0.5})`;
				//element.style.transform = `translateX(${(1 - frame) * -50}vw)`;
			}
			else if (frameRange(end, percent)) {
				const frame = getFrame(end, percent);
				element.style.opacity = 1 - frame;
				element.style.transform = `scale(${(1 - frame) * 0.5 + 0.5})`;
				//element.style.transform = `translateX(${(frame) * 50}vw)`;
			}
		}
	});
}

function frameRange(config, frame) {
	return config.start <= frame && frame < config.start + config.length;
}

function getFrame(config, frame) {
	return Math.min((Math.max(frame - config.start, 0) / config.length), 1);
}

function typewriter(id, func = null) {
	const element = document.getElementById(id);
	const text = element.innerText;
	element.innerText = '';

	let currentText = '';

	let i = 0;
	const interval = setInterval(() => {
		if (i < text.length) {
			currentText += text[i];
			element.innerHTML = currentText + "<span class='cursor'>|</span>";
			i++;
		} else {
			clearInterval(interval);
			if (func) {
				func();
			}

			// Blinking cursor effect
			setInterval(() => {
				const cursor = document.querySelector('.cursor');
				cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
			}, 500);
		}
	}, 140);
}