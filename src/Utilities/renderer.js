const electron = window.require('electron');
const { ipcRenderer } = electron;

const Storehandler = () => {
    return {
        saveURL : (url) => {
            ipcRenderer.send("saveURL", url);
        },
        getURL : () => {
            const url = ipcRenderer.sendSync("getURL");
            return url;
        },
        saveRoutes : (routes) => {
            ipcRenderer.send("setRoutes", routes);
        },
        getRoutes : () => {
            const routes = ipcRenderer.sendSync("getRoutes");
            return routes;
        },
        setSubscriptions : (subscriptions) => {
            ipcRenderer.send("setSubs", subscriptions);
        },
        getSubscriptions : () => {
            const subs = ipcRenderer.sendSync("getSubs");
            return subs;
        },
        getRoutines : () => {
            const routines = ipcRenderer.sendSync("getRoutines");
            return routines;
        },
        setRoutines : (routines) => {
            ipcRenderer.send("setRoutines", routines);
        },
        getRoutineWithID : (id) => {
            const routine = ipcRenderer.sendSync("getRoutineWithID", id);
            return routine;
        },
        setSingleRoutine : (routine) => {
            ipcRenderer.send("setSingleRoutine", routine);
        }
    }
}



export default Storehandler;