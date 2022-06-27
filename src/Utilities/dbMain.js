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
});

ipcMain.on("getRoutineWithID", (event, id) => {
    const routines = store.get("Routines");
    const jsonRout = JSON.parse(routines);
    const targetRoutine = jsonRout.filter((routine) => {
        return routine.id == id;
    });
    event.returnValue = targetRoutine[0];
});

ipcMain.on("setSingleRoutine", (event, routine) => {
    const routines = store.get("Routines");
    const jsonRout = JSON.parse(routines);
    console.log("Renderer triggered");
    
    const toSave = jsonRout.map((rout) => {
        if (rout.id === routine.id){
            return routine;
        }
        return rout;
    });

    store.set("Routines", JSON.stringify(toSave));
})


