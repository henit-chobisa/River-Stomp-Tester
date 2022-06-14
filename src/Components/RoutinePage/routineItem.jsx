import "../../Styles/RoutineItem.css"
import shareIcon from '../../Assets/Icons/shareIcon.png'

import React, { useRef } from 'react';
const RoutineItem = (props) => {

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


                    <div className="bottomBar">
                        <div className="removeButtonDiv">
                           <button className="removeButton">X</button>
                        </div>

                        <div className="utilitiesDiv">
                            <button className="shareButton">
                                <img src={shareIcon} alt="" />
                            </button>
                            <button className="run">
                                <p>View</p>
                            </button>
                        </div>

                    </div>

                </div>
                : // Dummy Etity to showcase routine item
                <div className="null">
                    <p className="nullText">No routines available,      Create One</p>
                </div>}
        </div>
    );
}

export default RoutineItem;

