import "../../Styles/RoutineItem.css"
import shareIcon from '../../Assets/Icons/shareIcon.png'
import React, { useState } from 'react';
import RoutineExecPage from "../../RoutineExecPage";
import RoutineDisplay from "./RoutineDisplay";
import launchRoutineWindow from "../../Utilities/RoutineSegway";

const RoutineItem = (props) => {

    const [windowOpen, updateWindowOpen] = useState(false);

    const handleButtonClick = () => {
        launchRoutineWindow()
        // updateWindowOpen(true);
    }

    return (
        <div className="routineItem">
            {props.present
                ? // If the container is working for an active entity
                <div className="present">

                    <div className="topBar">
                        <div className="heading">
                            <h3 className="title">{props.routine.title}</h3>
                        </div>
                        <div className="lastUpdate">
                            <p className="lastUpdate">{props.routine.lastUpdated}</p>
                        </div>
                    </div>

                    {windowOpen === true ? <RoutineExecPage>
                        <RoutineDisplay/>
                    </RoutineExecPage> : <></>}
                    <div className="bottomBar">
                        <div className="removeButtonDiv">
                            <button className="removeButton">X</button>
                        </div>

                        <div className="utilitiesDiv">
                            <button className="shareButton">
                                <img src={shareIcon} alt="" />
                            </button>
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

