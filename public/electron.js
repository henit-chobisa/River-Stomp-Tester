const path = require('path');
const { BrowserWindow,app} = require("electron");

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

    splashScreen.loadURL(`file://${path.join(__dirname, '../build/splash.html')}`);

    win.loadURL(
          `file://${path.join(__dirname, '../build/index.html')}`
      );

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

