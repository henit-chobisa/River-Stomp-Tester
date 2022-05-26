const path = require('path');
const { BrowserWindow,app} = require("electron");
const isDev = require('electron-is-dev');

  const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        title: "River",
        height: 720,
        minHeight: 720,
        minWidth: 1080,
        show: false,
        webPreferences: {
            nodeIntegration: true,
          }
    });

    const splashScreen = new BrowserWindow({
      width: 720,
        height: 320,
        center: true,
        resizable: false,
        transparent: false,
        frame: false,
        alwaysOnTop: true
    })

    splashScreen.loadURL(`file://${__dirname}/splash.html`);

    win.loadURL(
        isDev
          ? 'http://localhost:3000'
          : `file://${path.join(__dirname, '../build/index.html')}`
      );

    if (isDev) {
        win.webContents.openDevTools({ mode: 'detach' });
    }

    setTimeout(function () {
      splashScreen.destroy();
      win.show();
    }, 7000);
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

