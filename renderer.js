const timers = {
	timer1: 179,
	timer2: 359,
	timer3: 539,
	timer4: 719
}

let intervals = {};


function formatTimer(seconds){
	const minutes = Math.floor(seconds / 60);
	const sec = seconds % 60;
	return `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}


function updateTimer(timerId, value){
	document.getElementById(timerId).textContent = formatTimer(value);
}

function startTimer(timerId){
	if(intervals[timerId]) return;

	let timeLeft = timers[timerId];
	updateTimer(timerId, timeLeft);

	intervals[timerId] = setInterval(() =>{
		if (timeLeft > 0){
			timeLeft--;
			updateTimer(timerId, timeLeft);
			console.log("Timer is starting");
		}else{
			clearInterval(intervals[timerId]);
			delete intervals[timerId];
			console.log(`Timer ${timerId} is done`);
		}
	}, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
	console.log("DOM chargé !");
	const button = document.getElementById('go-to-page2');
	if (button) {
		button.addEventListener('click', () => {
			console.log("Bouton cliqué !");
			window.electron.send('navigate-to', 'page2.html');
		});
	} else {
		console.log("⚠️ Bouton non trouvé !");
	}
});

document.getElementById("timer1").addEventListener("click", () => startTimer("timer1"));
document.getElementById("timer2").addEventListener("click", () => startTimer("timer2"));
document.getElementById("timer3").addEventListener("click", () => startTimer("timer3"));
document.getElementById("timer4").addEventListener("click", () => startTimer("timer4"));

