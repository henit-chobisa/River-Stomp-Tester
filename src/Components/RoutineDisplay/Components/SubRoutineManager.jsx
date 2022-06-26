import React from "react";
import '../../../Styles/RoutineDisplay/Components/SubRoutineManager.css'

const SubRoutineManager = () => {

    return (
        <div className="subRoutineManager">
            <div className="basicEntities">
                <div className="basicInfo">
                    <div className="idContainer">
                        <p>8219</p>
                    </div>
                    <div className="typeContainer">
                        <p>PUBLISH</p>
                    </div>
                </div>
                <div className="subRoutineFire">
                    <p>Run Alone</p>
                </div>
            </div>

            <div className="middleInfoBar">
                <div className="leftBasicBar">

                </div>
                <div className="barDivider"></div>
                <div className="rightEditorBar">

                </div>

            </div>
            <div className="bottomStatusBar">

            </div>
        </div>
    )

}

export default SubRoutineManager;