const electron = window.require("electron");
const { ipcRenderer } = electron;

const launchRoutineWindow = (routineID) => {
    ipcRenderer.send("launchRoutineWindow", routineID);
}

export default launchRoutineWindow;