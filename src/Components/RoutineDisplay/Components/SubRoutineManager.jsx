import React, { useEffect } from "react";
import { useState } from "react";
import { useStompClient } from "react-stomp-hooks";
import '../../../Styles/RoutineDisplay/Components/SubRoutineManager.css'
import StatisticTitle from "../../Generic/StatisticTitle";
import OptionButton from "../../RoutinePage/OperationPanel/OptionButton";
import EditorComp from "../../SimpleTestingPage/EditorComp";
var defaultHeader = "{\n\t\"message\" : \"Insert your header here\"\n}"
var defaultBody = "{\n\t\"message\" : \"Insert your body here\"\n}";
var defaultRunButtonStatus = "Run Alone";
const SubRoutineManager = (props) => {

    const [subRoutine, updateSubRoutine] = useState(props.SubRoutine);
    const [bodySelected, updateBodySelected] = useState(true);
    const handlePersistence = () => { }
    const [data, updateData] = useState(defaultBody);
    const [header, updateHeader] = useState(defaultHeader);
    const [runButtonActive, updateRunButtonActive] = useState(true);
    const [runButtonStatus, updateRunButtonStatus] = useState(defaultRunButtonStatus);
    const stompClient = useStompClient();

    useEffect(() => {
        if (subRoutine !== undefined) {
            if (subRoutine.operation === "PUBLISH") {
                updateData(subRoutine.body);
                updateHeader(subRoutine.headers);
            }

            else {
                updateBodySelected(true);
                updateData(subRoutine.data);
                updateRunButtonActive(false);
            }
        }
    });

    // Run alone only valid for publish type subroutines

    const runAlone = () => {
        if (runButtonActive){
            updateRunButtonActive(false);
            updateRunButtonStatus("Running");
            var startTime = performance.now();
            stompClient.publish({destination: subRoutine.route, body: subRoutine.body, headers: subRoutine.headers});
            var endTime = performance.now();
            const executionTime = (Math.round((endTime - startTime) * 100) / 100).toFixed(2);
            const dataExchange = (Buffer.from(subRoutine.body).length) + (Buffer.from(subRoutine.headers).length);
            
        
            setTimeout(() => {
                updateRunButtonActive(true);
                updateRunButtonStatus(defaultRunButtonStatus);
            }, 1500)
        }
    }


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
                        <p>{subRoutine.id}</p>
                    </div>
                    <div className="typeContainer">
                        <p>{subRoutine.operation}</p>
                    </div>
                </div>
                <div className="subRoutineFire" style={{opacity : runButtonActive === true ? 1 : 0.5}} onClick={runAlone}>
                    <p>{runButtonStatus}</p>
                </div> 
            </div>

            <div className="middleInfoBar">
                <div className="leftBasicBar">
                    <div className="subRoutineTitleBar">
                        <p>{subRoutine.title}</p>
                    </div>
                    <div className="subRoutineDescriptionBar">
                        <p>{subRoutine.description}</p>
                    </div>
                    <div className="subRoutineStatsBar">
                        <div className="dataStats">
                            <StatisticTitle heading={"Data Exchange"} num={subRoutine.dataBytes} unit={"b"} />
                        </div>
                        <div className="speedStats">
                            <StatisticTitle heading={"Execution Time"} num={subRoutine.executionTime} unit={"ms"} />
                        </div>
                    </div>
                    <div className="routeInfoBar">
                        <p>
                            {subRoutine.route}
                        </p>
                    </div>

                </div>
                <div className="barDivider"></div>
                <div className="rightEditorBar">
                    <div className="optionsBar">
                        <OptionButton title={"Body"} isSelected={bodySelected} index={0} onClickOption={handleDataOptionClick} />
                        {subRoutine.operation === "PUBLISH" ? <OptionButton title={"Headers"} index={1} onClickOption={handleDataOptionClick} isSelected={!bodySelected} /> : <></>}
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