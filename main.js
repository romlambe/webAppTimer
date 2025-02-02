const { app, BrowserWindow, ipcMain, } = require('electron')
const path = require('path')


let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 400,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			contextIsolation: true,
			enableRemoteModule: false,
			nodeIntegration: false,
		}
	})

	mainWindow.loadFile('index.html');

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
};

app.whenReady().then(() => {
	createWindow();
});


ipcMain.on('navigate-to', (event, page) =>{
	if (mainWindow){
		mainWindow.loadFile(page);
	}
});

