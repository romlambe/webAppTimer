let timerInterval;
let timeRemaining;
let pause = false;

document.addEventListener("DOMContentLoaded", () => {
	console.log("✅ DOM chargé !");
	console.log("window.electron :", window.electron);

	const goToPage2Button = document.getElementById('go-to-page2');
	if (goToPage2Button) {
		goToPage2Button.addEventListener('click', () => {
			console.log("📌 Bouton Start cliqué !");
			if (window.electron) {
				window.electron.send('navigate-to', 'page2.html');
			} else {
				console.error("❌ window.electron est indéfini !");
			}
		});
	}

	if (document.getElementById('timer-selection')) {
		initTimerEvents();
	}
});

function initTimerEvents() {
	console.log("🔄 Initialisation des événements du timer");

	document.querySelectorAll('#timer-selection button').forEach(button => {
		button.addEventListener('click', () => {
			const time = parseInt(button.getAttribute("data-time"), 10);
			startTimer(time);
		});
	});

	const stopButton = document.getElementById('stop-timer');
	if (stopButton) {
		stopButton.addEventListener('click', stopTimer);
	}

	const backButton = document.getElementById('back-to-selection');
	if (backButton) {
		backButton.addEventListener('click', resetTimer);
	}
}

function startTimer(time) {
	timeRemaining = time;
	updateTimerDisplay();

	document.getElementById('timer-selection').style.display = 'none';
	document.getElementById('timer-display').style.display = 'block';

	timerInterval = setInterval(() => {
		if (timeRemaining <= 0) {
			clearInterval(timerInterval);
			console.log("⏳ Timer terminé !");
			resetTimer();
		} else {
			timeRemaining--;
			updateTimerDisplay();
		}
	}, 1000);
}

function updateTimerDisplay() {
	const min = Math.floor(timeRemaining / 60);
	const sec = timeRemaining % 60;
	document.getElementById('current-timer').textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function stopTimer() {
	if (pause === false){
		clearInterval(timerInterval);
		pause = true;
	}else{
		startTimer(timeRemaining);
		pause = false;
	}
}

function resetTimer() {
	clearInterval(timerInterval);
	document.getElementById('timer-selection').style.display = 'block';
	document.getElementById('timer-display').style.display = 'none';
}
