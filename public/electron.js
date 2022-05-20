const path = require('path');
const { BrowserWindow,app} = require("electron");
const isDev = require('electron-is-dev');

function createWindow(){
    const win = new BrowserWindow({
        width: 1080,
        height: 720,
        minHeight: 720,
        minWidth: 1080,
        webPreferences: {
            nodeIntegration: true,
          }
    });

    win.loadURL(
        isDev
          ? 'http://localhost:3000'
          : `file://${path.join(__dirname, '../build/index.html')}`
      );

    // if (isDev) {
    //     win.webContents.openDevTools({ mode: 'detach' });
    // }

}

    app.whenReady().then(createWindow);

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
          app.quit();
        }
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow();
        }
    });

