window.addEventListener('DOMContentLoaded', () => {
	addEffects();
});

function addEffects() {
	// Title typewriter effect
	typewriter('title', () => {
		document.getElementById('arrow').classList.add('animate');
	});

	animateDescription();
	animateTitles();
	animateProjects();

	animateEducation();
	animateSkills();
}

function animateEducation() {
	const education = document.getElementById('education');

	window.addEventListener('scroll', () => {
		const y = Math.max(window.innerHeight - education.getBoundingClientRect().top, 0);
		const percent = y / (education.getBoundingClientRect().height + window.innerHeight) * 100;

		const end = { start: 80, length: 20 };

		const a = { start: 20, length: 10 };
		const b = { start: 40, length: 10 };
		const c = { start: 60, length: 10 };

		const container = education.querySelector('.container');

		if (percent > 20 && percent < 100) {
			container.style.opacity = 1;

			if (frameRange(end, percent)) {
				const frame = getFrame(end, percent);
				container.style.opacity = easeOutSine(1 - frame);
			}

			container.style.top = `${easeOutSine(percent / 100) * -10 + 5}vh`

			const elements = container.children;

			const frameA = easeOutSine(getFrame(a, percent));
			elements[0].style.transform = `translateY(${100 - (frameA * 100)}px)`;
			elements[0].style.opacity = easeOutSine(frameA);
			
			const frameB = easeOutSine(getFrame(b, percent));
			elements[1].style.transform = `translateY(${100 - (frameB * 100)}px)`;
			elements[1].style.opacity = easeOutSine(frameB);

			const frameC = easeOutSine(getFrame(c, percent));
			elements[2].style.transform = `translateY(${100 - (frameC * 100)}px)`;
			elements[2].style.opacity = easeOutSine(frameC);
		}
		else {
			container.style.opacity = 0;
		}
	});
}

function animateSkills() {
	const skills = document.getElementById('skills');

	window.addEventListener('scroll', () => {
		const y = Math.max(window.innerHeight - skills.getBoundingClientRect().top, 0);
		const percent = y / skills.getBoundingClientRect().height * 100;
	});

	const texts = [
		"HTML", "CSS", "JavaScript",
		"Node.js", "Express", "MySQL",
		"PostgreSQL", "C", "C++",
		"Java", "Python", "Git",
		"Sass", "SDL2", "GLSL",
	];

	let tagCloud = new TagCloud('#skills', texts, {
		radius: 300,
		maxSpeed: 'normal',
		initSpeed: 'normal',
		direction: 135,
		keep: true,
		fontSize: 24,
	});
}

function animateProjects() {
	const projects = document.getElementsByClassName('project');

	window.addEventListener('scroll', () => {
		let i = 0;
		for (let project of projects) {
			i++;

			const y = Math.max(window.innerHeight - project.getBoundingClientRect().top, 0);
			const percent = y / (project.getBoundingClientRect().height + window.innerHeight) * 100;
			const video = project.querySelector('video');
			const image = project.querySelector('img');

			const start = { start: 25, length: 20 };
			const end = { start: 70, length: 20 };

			if (percent > 0 && percent < 100) {
				let frame = getFrame(start, percent);
				frame = easeOutSine(frame);

				project.style.opacity = frame;

				if (i == projects.length) {
					if (frameRange(end, percent)) {
						let frame = getFrame(end, percent);
						frame = easeOutSine(1 - frame);
		
						project.style.opacity = frame;
					}
					if (percent > 90) {
						project.style.opacity = 0;
					}	
				}

				if (video && video.paused) {
					video.play();
				}

				if (image) {
					image.classList.add('fixed');
				}
				else if (video) {
					video.classList.add('fixed');
				}
			}
			else {
				if (video && !video.paused) {
					video.pause();
				}

				project.style.opacity = 0;

				if (image) {
					image.classList.remove('fixed');
				}
				else if (video) {
					video.classList.remove('fixed');
				}
			}
		}
	});
}

function animateTitles() {
	const titles = document.getElementsByClassName('title');

	for (let title of titles) {
		const project = title;
		const text = project.querySelector('h1');

		window.addEventListener('scroll', () => {
			const y = Math.max(window.innerHeight - project.getBoundingClientRect().top - (window.innerHeight * 0.7), 0);
			const percent = y / project.getBoundingClientRect().height * 100;

			const start = { start: 0, length: 30 };
			const mid = { start: 30, length: 40 };
			const end = { start: 70, length: 30 };

			text.style.opacity = 0;

			if (frameRange(start, percent)) {
				const frame = getFrame(start, percent);
				text.style.color = 'transparent';
				text.style.opacity = easeOutSine(frame);

				text.style.top = `${100 - easeOutSine(frame) * 50}vh`;
			}
			else if (frameRange(mid, percent)) {
				const frame = getFrame(mid, percent);
				text.style.top = '50vh';
				text.style.opacity = 1;
				text.style.background = `linear-gradient(0deg, #000000 ${frame * 100}%, #ffffff ${frame * 100}%)`;
				text.style.webkitBackgroundClip = 'text';
			}
			else if (frameRange(end, percent)) {
				const frame = getFrame(end, percent);
				text.style.color = '#000000';
				text.style.opacity = easeOutSine(1 - frame);

				text.style.top = `${50 + easeOutSine(frame) * -50}vh`;
			}
		});
	}
}

function animateDescription() {
	const description = document.getElementById('description');
	const elements = description.children;

	window.addEventListener('scroll', () => {
		// If the description is not in view, don't animate
		if (description.getBoundingClientRect().top > window.innerHeight || description.getBoundingClientRect().bottom < 0) {
			return;
		}

		for (element of elements) {
			const y = Math.max(window.innerHeight - element.getBoundingClientRect().top - element.getBoundingClientRect().height / 2, 0);
			const percent = y / window.innerHeight * 100;

			const start = { start: 0, length: 50 };
			const end = { start: 50, length: 50 };

			element.style.opacity = 0;

			if (frameRange(start, percent)) {
				const frame = getFrame(start, percent);
				element.style.opacity = easeOutSine(frame);

				//element.style.transform = `scale(${(1 - frame) * 0.5 + 1})`;
				element.style.transform = `scale(${easeOutSine(frame) * 0.3 + 0.7})`;
			}
			else if (frameRange(end, percent)) {
				const frame = getFrame(end, percent);
				element.style.opacity = easeOutSine(1 - frame);

				//element.style.transform = `scale(${(1 - frame) * 0.5 + 0.5})`;
				element.style.transform = `scale(${easeOutSine(1 - frame) * 0.3 + 0.7})`;
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

function easeOutSine(x) {
	return Math.sin((x * Math.PI) / 2);
}