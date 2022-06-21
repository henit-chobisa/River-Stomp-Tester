import "../../Styles/RoutineItem.css"
import React from 'react';
import launchRoutineWindow from "../../Utilities/RoutineSegway";

const RoutineItem = (props) => {

    const handleButtonClick = () => {
        launchRoutineWindow()
    }

    const handleDelete = () => {
        props.deleteHandler(props.index);
    }

    const handleClick = (event) => {
        if (event.target.className !== "deleteButton"){
            props.clickHandler(props.index);
        }
    }

    const fetchPreesentBackgroundColor = () => {
        return props.isActive ? {backgroundColor : "rgb(245, 61, 61)"} : {backgroundColor : "rgb(0, 160, 198)"}
    }

    return (
        <div className="routineItem">
            {props.present
                ? // If the container is working for an active entity
                <div className="present" onClick={handleClick} style={fetchPreesentBackgroundColor()}>
                    <div className="topBar">
                        <div className="heading">
                            <h3 className="title">{props.routine.title}</h3>
                            <div onClick={handleDelete} className="deleteButton">x</div>
                        </div>
                    </div>
                    <div className="bottomBar">
                        <div className="utilitiesDiv">
                        <div className="lastUpdate">
                            <p className="lastUpdate">{props.routine.lastUpdated}</p>
                        </div>
                            <div className="shareButton">
                                <p>📤</p>
                            </div>
                            <button className="run" onClick={handleButtonClick}>
                                <p>View</p>
                            </button>
                        </div>

                    </div>

                </div>
                : // Dummy Etity to showcase routine item
                <div className="null">
                    <p className="nullText">No routines available, Create One</p>
                </div>}
        </div>
    );
}

export default RoutineItem;

