import React, { useEffect } from "react";
import { useState } from "react";
import '../../../Styles/RoutineDisplay/Components/SubRoutineManager.css'
import StatisticTitle from "../../Generic/StatisticTitle";
import OptionButton from "../../RoutinePage/OperationPanel/OptionButton";
import EditorComp from "../../SimpleTestingPage/EditorComp";
var defaultHeader = "{\n\t\"message\" : \"Insert your header here\"\n}"
var defaultBody = "{\n\t\"message\" : \"Insert your body here\"\n}";

const SubRoutineManager = (props) => {

    const [bodySelected, updateBodySelected] = useState(true);
    const handlePersistence = () => { }
    const [data, updateData] = useState(defaultBody);
    const [header, updateHeader] = useState(defaultHeader);

    useEffect(() => {
        if (props.SubRoutine !== undefined) {
            if (props.SubRoutine.operation === "PUBLISH") {
                updateData(props.SubRoutine.body);
                updateHeader(props.SubRoutine.headers);
            }

            else {
                updateBodySelected(true);
                updateData(props.SubRoutine.data);
            }
        }
    })


    const handleDataOptionClick = (index) => {
        console.log(console.log(data));
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
                        <p>{props.SubRoutine.id}</p>
                    </div>
                    <div className="typeContainer">
                        <p>{props.SubRoutine.operation}</p>
                    </div>
                </div>
                <div className="subRoutineFire">
                    <p>Run Alone</p>
                </div>
            </div>

            <div className="middleInfoBar">
                <div className="leftBasicBar">
                    <div className="subRoutineTitleBar">
                        <p>{props.SubRoutine.title}</p>
                    </div>
                    <div className="subRoutineDescriptionBar">
                        <p>{props.SubRoutine.description}</p>
                    </div>
                    <div className="subRoutineStatsBar">
                        <div className="dataStats">
                            <StatisticTitle heading={"Data Exchange"} num={props.SubRoutine.dataBytes} unit={"b"} />
                        </div>
                        <div className="speedStats">
                            <StatisticTitle heading={"Execution Time"} num={props.SubRoutine.executionTime} unit={"ms"} />
                        </div>
                    </div>
                    <div className="routeInfoBar">
                        <p>
                            {props.SubRoutine.route}
                        </p>
                    </div>

                </div>
                <div className="barDivider"></div>
                <div className="rightEditorBar">
                    <div className="optionsBar">
                        <OptionButton title={"Body"} isSelected={bodySelected} index={0} onClickOption={handleDataOptionClick} />
                        {props.SubRoutine.operation === "PUBLISH" ? <OptionButton title={"Headers"} index={1} onClickOption={handleDataOptionClick} isSelected={!bodySelected} /> : <></>}
                    </div>
                    <div className="mainEditor">
                        <EditorComp data={bodySelected ? data : header} handlePersistence={handlePersistence} updateData={bodySelected ? updateData : updateHeader} />
                    </div>
                </div>

            </div>
            <div className="bottomStatusBar">
                <p>Operation Status such as save || modification || Run Alone Success/ Failure shall be shown over here</p>
            </div>
        </div> : <div className="nullWarning">
            <p>Select a subRoutine for getting solo run info</p>
        </div>
    )

}

export default SubRoutineManager;