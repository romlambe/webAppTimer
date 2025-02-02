const { contextBridge, ipcRenderer } = require('electron');

console.log("Preload chargé !");
contextBridge.exposeInMainWorld('electron', {
	send: (channel, data) => ipcRenderer.send(channel, data)
});
