import React from "react";
import { useState } from "react";
import '../../../Styles/RoutineDisplay/Components/SubRoutineManager.css'
import StatisticTitle from "../../Generic/StatisticTitle";
import OptionButton from "../../RoutinePage/OperationPanel/OptionButton";
import EditorComp from "../../SimpleTestingPage/EditorComp";
var defaultBody = "{\n\t\"message\" : \"Insert your body here\"\n}";
var defaultHeader = "{\n\t\"message\" : \"Insert your header here\"\n}"

const SubRoutineManager = (props) => {

    const [bodySelected, updateBodySelected] = useState(true);
    const handlePersistence = () => { }
    const [data, updateData] = useState(defaultBody);
    const [header, updateHeader] = useState(defaultHeader);


    const handleDataOptionClick = (index) => {
        console.log(props.SubRoutine)
        if (index === 0) {
            updateBodySelected(true);
        }
        else {
            updateBodySelected(false);
        }
    }



    return (
        props.SubRoutine !== undefined ? <div className="subRoutineManager">
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
                    <div className="subRoutineTitleBar">
                        <p>Hello SubRoutine</p>
                    </div>
                    <div className="subRoutineDescriptionBar">
                        <p>Hello My name is henit chobisa and I developed River Stomp Tester with my hardwork and patience.</p>
                    </div>
                    <div className="subRoutineStatsBar">
                        <div className="dataStats">
                            <StatisticTitle heading={"Data Exchange"} num={400} unit={"b"} />
                        </div>
                        <div className="speedStats">
                            <StatisticTitle heading={"Data Exchange"} num={400} unit={"b"} />
                        </div>
                    </div>
                    <div className="routeInfoBar">
                        <p>
                            /hello/River
                        </p>
                    </div>

                </div>
                <div className="barDivider"></div>
                <div className="rightEditorBar">
                    <div className="optionsBar">
                        <OptionButton title={"Body"} isSelected={bodySelected} index={0} onClickOption={handleDataOptionClick} />
                        <OptionButton title={"Headers"} index={1} onClickOption={handleDataOptionClick} isSelected={!bodySelected}/>
                    </div>
                    <div className="mainEditor">
                        <EditorComp data={bodySelected ? data : header} handlePersistence={handlePersistence} updateData={bodySelected ? updateData : updateHeader} />
                    </div>
                </div>

            </div>
            <div className="bottomStatusBar">

            </div>
        </div> : <div className="nullWarning">
            <p>Select a subRoutine for getting solo run info</p>
        </div>
    )

}

export default SubRoutineManager;