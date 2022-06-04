const path = require('path');
const { BrowserWindow,app, ipcMain} = require("electron");
const isDev = require('electron-is-dev');
const Store = require("electron-store");
let store = new Store();

const initalizeStore = () => {
    if (store.get("Routes") === null){
      console.log("Initializing DB with routes");
      store.set("Routes", []);
    }
    if (store.get("Subscriptions") === null){
      console.log("Initializing DB with Subscriptions");
      store.set("Routes", []);
    }
  }
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
          },
        titleBarOverlay: {
            color: "black"
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
    });

    initalizeStore();

    ipcMain.on("updateRoutes", (eve, routes) => {
      console.log("Routes Updates");
      store.set("Routes", routes)
    });

    ipcMain.on("updateSubscriptions", (eve, subscriptions) => {
      store.set("Subscriptions", subscriptions);
    });

    ipcMain.on("fetchRoutes", (eve, args) => {
      return store.get("Routes");
    })

    ipcMain.on("fetchSubscriptions", (eve, args) => {
      return store.get("Subsctiptions");
    })

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

