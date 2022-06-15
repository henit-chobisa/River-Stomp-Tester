import "../../Styles/RoutineItem.css"
import shareIcon from '../../Assets/Icons/shareIcon.png'
import React, { useRef, useState } from 'react';
// import launchRoutineWindow from '../../Utilities/RoutineSegway'
import RoutineExecPage from "../../RoutineExecPage";

const RoutineItem = (props) => {

    const [windowOpen, updateWindowOpen] = useState(false);

    const handleButtonClick = () => {
        updateWindowOpen(true);
    }

    return (
        <div className="routineItem">
            {props.present
                ? // If the container is working for an active entity
                <div className="present">

                    <div className="topBar">
                        <div className="heading">
                            <h3 className="title">Routine Heading</h3>
                        </div>
                        <div className="lastUpdate">
                            <p className="lastUpdate">last updated</p>
                        </div>
                    </div>

                    {windowOpen === true ? <RoutineExecPage>
                        <h1>Hello this is new Window</h1>
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

