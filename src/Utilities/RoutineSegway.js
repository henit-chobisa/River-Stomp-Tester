const electron = window.require("electron");
const { ipcRenderer } = electron;

const launchRoutineWindow = () => {
    ipcRenderer.send("launchRoutineWindow");
}

export default launchRoutineWindow;