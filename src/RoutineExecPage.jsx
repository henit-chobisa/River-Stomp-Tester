import { useEffect } from "react";
import ReactDOM from "react-dom";

const RoutineExecPage = (props) => {

    var container = document.createElement('div');
    var externalWindow = null;

    useEffect(() => {
        externalWindow = window.open('', 'RoutineExecPage');
        if (externalWindow){
            externalWindow.document.body.appendChild(container);
            externalWindow.onunload = () => {
            }
        }
    })

    return (
        ReactDOM.createPortal((props.children), container)
    )
}

export default RoutineExecPage;