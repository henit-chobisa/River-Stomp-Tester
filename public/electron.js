const path = require('path');
const { BrowserWindow, app } = require("electron");
const { ipcMain} = require("electron");
const isDev = require('electron-is-dev');
require("../src/Utilities/dbMain");
require("../src/Utilities/RoutineSegwayListener");
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

  win.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
    if (frameName == 'RoutineExecPage') {
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
      event.newGuest = new BrowserWindow(options);
      event.newGuest.webContents.openDevTools({ mode: 'detach' });
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

  ipcMain.on('launchRoutineWindow', () => {
    const routineWin = new BrowserWindow({
        width: 1280,
        title: "Routine System",
        height: 720,
        minHeight: 720,
        minWidth: 1080,
        show: false,
        x: 200,
        y: 400,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });

    console.log(__dirname);
    
    routineWin.loadURL(`file://${path.join(__dirname, '../build/index.html#/disprout?routineID=1000')}`);

    routineWin.webContents.openDevTools({mode:"detach"});
    routineWin.show();
})

  // splashScreen.loadURL(`file://${path.join(__dirname, '../build/splash.html')}`);
  splashScreen.loadURL(`file://${__dirname}/splash.html`);

  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  // win.loadURL(`file://${path.join(__dirname, '../build/index.html#/')}`);

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

