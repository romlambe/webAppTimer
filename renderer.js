let timerInterval;
let timeRemaining;
let pause = false;

document.addEventListener("DOMContentLoaded", () => {

	const goToPage2Button = document.getElementById('go-to-page2');
	if (goToPage2Button) {
		goToPage2Button.addEventListener('click', () => {
			if (window.electron) {
				window.electron.send('navigate-to', 'page2.html');
			}
		});
	}
	const goToHomePage = document.getElementById('go-to-home');
	if (goToHomePage) {
		goToHomePage.addEventListener('click', () => {
			if (window.electron){
				window.electron.send('navigate-to', 'index.html');
			}
		})
	}
	if (document.getElementById('timer-selection')) {
		initTimerEvents();
	}
});

function initTimerEvents() {
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

	document.getElementById('go-to-home').style.display = 'none';
	document.getElementById('timer-selection').style.display = 'none';
	document.getElementById('timer-display').style.display = 'block';

	timerInterval = setInterval(() => {
		if (timeRemaining <= 0) {
			endTimer()
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
	document.getElementById('go-to-home').style.display = 'block';
	document.getElementById('timer-selection').style.display = 'block';
	document.getElementById('timer-display').style.display = 'none';

	// Pour réappliquer le CSS
	document.getElementById('timer-selection').style.display = 'flex';
	document.getElementById('go-to-home').style.display = 'flex';

}

function endTimer(){
	clearInterval(timerInterval);
}

//rajouter un son lorsque le timer est terminé,
//changer le bouton en stop pour arreter le son,
//puis revenir dans le menu

//ajouter des animations lorsque le minuteur tourne 
