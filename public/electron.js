const path = require('path');
const { BrowserWindow, app } = require("electron");
const { ipcMain} = require("electron");
const isDev = require('electron-is-dev');
require("../src/Utilities/dbMain");
require("../src/Utilities/RoutineSegwayListener");
require("fs");

const openedWindowInfo = [];

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

  ipcMain.on('launchRoutineWindow', (event, routineID) => {
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

    console.log(routineID);
    // routineWin.loadURL(`file://${path.join(__dirname, '../build/index.html#/disprout?routineID=1000')}`);
    routineWin.loadURL(`http://localhost:3000/disprout?routineID=${routineID}`);

    routineWin.webContents.openDevTools({mode:"detach"});
    routineWin.show();
    openedWindowInfo.push({routineID, routineWin});
})

  splashScreen.loadURL(`file://${path.join(__dirname, '../build/splash.html')}`);
  // splashScreen.loadURL(`file://${__dirname}/splash.html`);

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

