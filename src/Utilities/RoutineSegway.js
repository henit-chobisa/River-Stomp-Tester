const electron = window.require("electron");
const { ipcRenderer } = electron;

const launchRoutineWindow = (routineID) => {
    ipcRenderer.send("launchRoutineWindow");
}

export default launchRoutineWindow;