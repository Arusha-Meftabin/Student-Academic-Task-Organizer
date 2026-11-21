
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('studyMateWindow', {
    minimize: () => ipcRenderer.send('window-minimize'),

    maximize: () => ipcRenderer.send('window-maximize'),

    close: () => ipcRenderer.send('window-close'),

    onMaximizeChange: (callback) => {
        ipcRenderer.on('window-maximized', (event, isMaximized) => {
            callback(isMaximized);
        });
    }
});
