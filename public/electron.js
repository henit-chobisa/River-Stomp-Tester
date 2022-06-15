const path = require('path');
const { BrowserWindow, app } = require("electron");
const isDev = require('electron-is-dev');
require("../src/Utilities/dbMain");
require('../src/Utilities/RoutineSegwayListener');
require("fs");

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
      enableRemoteModule: true,
      contextIsolation: false,
      nativeWindowOpen: true,
    }
  });

  win.webContents.on('new-window', (event, frameName, options) => {
    if (frameName == 'RoutineExecPage') {
      console.log("Rouine Page request Innn");
      event.preventDefault();
      Object.assign(options, {
        parent: win,
        width: 1280,
        title: "River",
        height: 720,
        minHeight: 720,
        minWidth: 1080,
        show: true,
      });
      const routineExecWindow = new BrowserWindow(options);
      routineExecWindow.webContents.openDevTools({mode:"detach"});
      event.newGuest = routineExecWindow;
    }
    else {
      console.log("Frame Name Incorrect");
    }
  })
  const splashScreen = new BrowserWindow({
    width: 720,
    height: 320,
    center: true,
    resizable: false,
    transparent: false,
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false
    }
  });

  // splashScreen.loadURL(`file://${path.join(__dirname, '../build/splash.html')}`);
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

