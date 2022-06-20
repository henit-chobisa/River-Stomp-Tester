const { ipcMain } = require('electron');
const Store = require('electron-store');
const store = new Store();

ipcMain.on('saveURL', (event, URL) => {
    store.set("ConnectionURL", URL);
});

ipcMain.on("getURL", (event) => {
    const url = store.get("ConnectionURL");
    event.returnValue = url;
})

ipcMain.on("getRoutes", (event) => {
    const routes = store.get("Routes");
    event.returnValue = routes;
});

ipcMain.on("setRoutes", (event, routes) => {
    store.set("Routes", routes);
})

ipcMain.on("getSubs", (event) => {
    const subs = store.get("Subscriptions");
    event.returnValue = subs;
});

ipcMain.on("setSubs", (event, subs) => {
    store.set("Subscriptions", subs);
});

ipcMain.on("setRoutines", (event, routines) => {
    store.set("Routines", routines);
});

ipcMain.on("getRoutines", (event) => {
    const routines = store.get("Routines");
    event.returnValue = routines;
})


