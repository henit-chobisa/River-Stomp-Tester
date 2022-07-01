import React, { useEffect } from "react";
import { useState } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from 'react-json-editor-ajrm/locale/en'
import { useStompClient } from "react-stomp-hooks";
import '../../../Styles/RoutineDisplay/Components/SubRoutineManager.css'
import StatisticTitle from "../../Generic/StatisticTitle";
import OptionButton from "../../RoutinePage/OperationPanel/OptionButton";
import EditorComp from "../../SimpleTestingPage/EditorComp";
var defaultHeader = "{\n\t\"message\" : \"Insert your header here\"\n}"
var defaultBody = "{\n\t\"message\" : \"Insert your body here\"\n}";
var defaultRunButtonStatus = "Run Alone";
var defaultBottomMessage = "Messages related to selected routine would be displayed here.";
const SubRoutineManager = (props) => {

    const [subRoutine, updateSubRoutine] = useState(null);
    const [bodySelected, updateBodySelected] = useState(true);
    const handlePersistence = () => { }
    const [data, updateData] = useState(defaultBody);
    const [header, updateHeader] = useState(defaultHeader);
    const [runButtonActive, updateRunButtonActive] = useState(true);
    const [runButtonStatus, updateRunButtonStatus] = useState(defaultRunButtonStatus);
    const [bottomMessage, updateBottomMessage] = useState(defaultBottomMessage);
    const [bottomBarActive, updateBottomBarActive] = useState(false);
    const stompClient = useStompClient();

    useEffect(() => {
        updateSubRoutine(props.SubRoutine);
        if (props.SubRoutine !== null) {
            if (props.SubRoutine.operation === "PUBLISH") {
                updateData(props.SubRoutine.body);
                updateHeader(props.SubRoutine.headers);
                updateRunButtonActive(true);
            }
            else {
                updateBodySelected(true);
                updateData(props.SubRoutine.data);
                updateHeader(defaultHeader);
                updateRunButtonActive(false);
            }
        }
    });

    const updateParentRoutine = (subRoutine) => {
        updateBottomMessage("Sending update request to parent routine");
        props.updateSubRoutineColl(props.index, subRoutine);
        setTimeout(() => {
            updateBottomMessage(defaultBottomMessage);
            updateBottomBarActive(false);
        }, 3000);
    }

    // Run alone only valid for publish type subroutines

    const runAlone = () => {
        if (runButtonActive) {
            updateBottomBarActive(true);
            updateBottomMessage("Initiating Client for Publishing SubRoutine")
            updateRunButtonActive(false);
            updateRunButtonStatus("Running");
            var startTime = performance.now();
            const subr = props.getValueFromSet(subRoutine, props.index);
            stompClient.publish({ destination: subr.route, body: subr.body, headers: subr.headers });
            var endTime = performance.now();
            const executionTime = parseFloat((Math.round((endTime - startTime) * 100) / 100).toFixed(2));
            const dataExchange = (Buffer.from(subr.body).length) + (Buffer.from(subr.headers).length);
            setTimeout(() => {
                const data = subr;
                data.executionTime = executionTime;
                data.dataBytes = dataExchange;
                updateSubRoutine(data);
                updateBottomMessage("Message Published to the destination");
                updateParentRoutine(data);
                updateRunButtonActive(true);
                updateRunButtonStatus(defaultRunButtonStatus);
            }, 1500)
        }
    }

    const giveBottomBarClass = () => {
        if (bottomBarActive === true){
            return "bbTitleActive";
        }
        else {
            return "bbTitleInActive";
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
        subRoutine !== null ? <div className="subRoutineManager">
            <div className="basicEntities">
                <div className="basicInfo">
                    <div className="idContainer">
                        <p>{subRoutine.id}</p>
                    </div>
                    <div className="typeContainer">
                        <p>{subRoutine.operation}</p>
                    </div>
                </div>
                <div className="subRoutineFire" style={{ opacity: runButtonActive === true ? 1 : 0.5 }} onClick={runAlone}>
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
                        {subRoutine.operation === "PUBLISH" ?<EditorComp data={bodySelected ? data : header} handlePersistence={handlePersistence} updateData={bodySelected ? updateData : updateHeader} /> : 
                        <JSONInput
                            placeholder={{data}}
                            locale={locale}
                            height="100%"
                            width="100%"
                            viewOnly={true}
                        />
                        }
                    </div>
                </div>

            </div>
            <div className="bottomStatusBar">
                <p className={giveBottomBarClass()}>{bottomMessage}</p>
            </div>
        </div> : <div className="nullWarning">
            <p>Select a subRoutine for getting solo run info</p>
        </div>
    )

}

export default SubRoutineManager;