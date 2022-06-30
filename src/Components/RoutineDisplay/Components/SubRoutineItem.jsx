import React from "react";
import '../../../Styles/RoutineDisplay/Components/SubRoutineItem.css';
import { useSubscription } from "react-stomp-hooks";

const SubRoutineItem = (props) => {

    const renderBackgroundColor = () => {
        if (props.isSelected) {
            return { backgroundColor: "rgb(245, 61, 61)" }
        }
        else {
            return { backgroundColor: "rgb(0, 160, 198)" }
        }
    }

    const handleSubsCallback = (message) => {
        props.subsCallback(props.subRoutine.id, message.body);
    }

    useSubscription(props.subRoutine.route, handleSubsCallback);

    const handleSelection = (event) => {
        if (event.target.className !== "srDelete" && event.target.className !== "deleteCrosshair") {
            props.selectSubRoutine(props.index);
        }
    }

    const handleDeletion = (event) => {
        props.deleteRoutine(props.index);
    }

    const giveLinkClassName = () => {
        if (props.runTime === false){
            return "linkInactive";
        }
        else {
            return "linkActive";
        }
    }

    return (
        <div className="subRoutineItem">
            {props.index === 0 ? <></> : <div className={giveLinkClassName()}></div>}
            <div className="itemComponent" style={renderBackgroundColor()} onClick={handleSelection}>
                <div className="idContainer">
                    <p>{props.subRoutine.id}</p>
                </div>
                <div className="basics">
                    <div className="srName">
                        <p>{props.subRoutine.title}</p>
                    </div>
                    <div onClick={handleDeletion} className="srDelete" >
                        <p className="deleteCrosshair">x</p>
                    </div>
                </div>
            </div>

        </div>
    )

}


export default SubRoutineItem;