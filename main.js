const { app, BrowserWindow } = require('electron')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 400,
		height: 600,
		// backgroundColor: '#1e1e1e',
		// titleBarStyle: 'hiddenInset',
		// trafficLightPosition: { x: 10, y: 10 },
	})
	win.loadFile('index.html')
}

app.whenReady().then(() =>{
	createWindow();
})

