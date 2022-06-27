import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import '../../Styles/RoutineDisplay/RoutineDispMain.css'
import logo from '../../Assets/logo.png'
import OptionButton from "../RoutinePage/OperationPanel/OptionButton";
import OptionWrapper from "./Components/OptionWrapper";
import SubRoutineItem from "./Components/SubRoutineItem";
import { useRef } from "react";
import SubRoutineManager from "./Components/SubRoutineManager";
import Storehandler from "../../Utilities/renderer";
import MessageBar from "../../Styles/RoutineDisplay/Components/MessageBar";

const RoutineDisplay = (props) => {
    const [searchParams, updateSearchParams] = useSearchParams();
    const [selectedIndex, updateSelectedIndex] = useState(null);
    const [subRoutines, updateSubRoutines] = useState([]);
    const [initLoad, updateInitLoad] = useState(true);
    const [selectedSubRoutine, updateSelectedSubRoutine] = useState(null);
    const [runTime, updateRunTime] = useState(true);
    const subRoutineGroupComponent = useRef();
    const [subRoutineUpdateStatus, updateSRUS] = useState(0);
    const [messageVisible, updateMessageVisible] = useState(false);
    const [message, updateMessage] = useState(false);
    const [loadingMessage, updateLoadingMessage] = useState(false);
    const store = Storehandler();
    const [targetRoutine, updateTargetRoutine] = useState({});

    const getTargetRoutineID = () => {
        return searchParams.get("routineID");
    }

    const showMessage = (message, isLoading) => {
        updateMessage(message);
        updateLoadingMessage(isLoading);
        updateMessageVisible(true);
    }

    useEffect(() => {
        if (initLoad === true) {
            const fetched = store.getRoutineWithID(getTargetRoutineID());
            if (fetched.subRoutines === undefined) {
                fetched["subRoutines"] = subRoutines;
                store.setSingleRoutine(fetched);
            }
            else {
                updateSubRoutines(fetched["subRoutines"]);
            }
            updateTargetRoutine(fetched);
            updateInitLoad(false);

            if(props.connected === true){
                showMessage(`Routine System Connected with ${props.connectionURL}`, false);
                setTimeout(() => {
                    updateMessageVisible(false);
                }, 5000);
            }
        }

        if (subRoutineUpdateStatus !== 0) {
            const ref = targetRoutine;
            ref["subRoutines"] = subRoutines;
            updateTargetRoutine(ref);
            store.setSingleRoutine(ref);
            updateSRUS(0);
        }

        if (subRoutineUpdateStatus === 1) {
            if (subRoutines.length > 2) {
                subRoutineGroupComponent.current.getElementsByClassName("subRoutineItem")[subRoutines.length - 1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                updateSRUS(0);
            }
        }
    }, [subRoutineUpdateStatus]);

    const [options, updateOptions] = useState([
        { title: "Routine Map", isSelected: false },
        { title: "Statistics", isSelected: false },
        { title: "Observations", isSelected: false },
        { title: "Create Subroutine", isSelected: false }
    ]);

    const handleOptionClickCallback = (index) => {
        console.log(targetRoutine);
        const clone = [...options];
        if (selectedIndex !== null) {
            clone[selectedIndex].isSelected = false;
        }
        updateSelectedIndex(index);
        clone[index].isSelected = true;
        updateOptions(clone);
    }

    const renderOptions = () => {
        if (subRoutines.length > 0){
            return options.map((option, index) => (<OptionButton key={index} onClickOption={handleOptionClickCallback} index={index} isSelected={option.isSelected} title={option.title} />));
        }
        else {
            return options.filter((option, index) => {
                return index === 3;
            }).map((option, index) => (<OptionButton key={index} onClickOption={handleOptionClickCallback} index={3} isSelected={option.isSelected} title={option.title} />));
        }
        
    }

    const renderOptionComponent = () => {
        if (selectedIndex === null) {
            return (
                <div className="nullOptionWarning">
                    <p>Select an option to display :)</p>
                </div>
            )
        }
        else {
            return (
                <div className="OptionView">
                    <OptionWrapper data={subRoutines} selection={selectedIndex} addSubRoutine={addSubRoutine} />
                </div>
            )
        }
    }

    const addSubRoutine = (subRoutineObject) => {
        const clone = [...subRoutines];
        var count = 2;
        clone.map((subRoutine) => {
            if (subRoutineObject.title === subRoutine.title) {

                if (subRoutineObject.operation !== subRoutine.operation) {
                    subRoutine.title = `${subRoutine.title}#${subRoutine.operation.slice(0, 3)}`
                    subRoutineObject.title = `${subRoutineObject.title}#${subRoutineObject.operation.slice(0, 3)}`
                }
                else {
                    subRoutineObject.title = count === 2 ? `${subRoutineObject.title}${count}` : `${subRoutineObject.title.slice(0, -1)}${count}`;
                    count++;
                }
            }
            if (subRoutineObject.id === subRoutine.id) {
                subRoutineObject.id = Math.floor(Math.random() * 10000);
            }
        });
        clone.push(subRoutineObject);
        updateSubRoutines(clone);
        updateSRUS(1);
    }

    const deleteRoutine = (index) => {
        const clone = [...subRoutines];
        if (index === selectSubRoutine) {
            updateSelectedSubRoutine(null);
        }
        clone.splice(index, 1);
        updateSubRoutines(clone);
        updateSRUS(2);
    }

    const selectSubRoutine = (index) => {
        updateSelectedSubRoutine(index);
    }

    const loadSubRoutines = () => {
        return subRoutines.map((routine, index) => {
            return (
                <SubRoutineItem key={index} index={index} runTime={runTime} selectSubRoutine={selectSubRoutine} deleteRoutine={deleteRoutine} isSelected={selectedSubRoutine === index} subRoutine={routine} />
            )
        })
    }

    const renderSubRoutineManager = () => {
        if (selectedSubRoutine === null) {
            return (
                <div className="nullWarning">
                    <p>Select a subRoutine for getting solo run info</p>
                </div>
            )
        }
        else {
            return (<SubRoutineManager SubRoutine={subRoutines[selectedSubRoutine]} />)
        }
    }

    return (
        <div className="routineDisplay">
            <div className="topBar">
                <div className="leftBar">
                    <div className="logo">
                        <img className="logoIMG" src={logo} alt="" />
                    </div>
                    <div className="routineName">
                        <p>Routine Name</p>
                    </div>
                </div>
                <div className="rightBarTitle">
                    R i v e r
                </div>
            </div>
            <div className="middleBar">
                <div className="utilities">
                    <div className="display">
                        {renderOptionComponent()}
                    </div>
                    <div className="divider"></div>
                    <div className="options">
                        {renderOptions()}
                    </div>
                </div>
                <div className="subRoutines">
                    <div className="topBar">
                        <div className="heading">
                            <p>Sub-Routines</p>
                        </div>

                    </div>
                    <div className="subRoutineContainer">
                        <div className="runnerButton">
                            <div className="tria"></div>
                        </div>
                        <div className="buttonDivider"></div>
                        <div className="subRoutineContainerGroup" ref={subRoutineGroupComponent}>
                            {loadSubRoutines()}
                        </div>
                    </div>
                    <div className="subRoutineManagerContainer">
                        {renderSubRoutineManager()}
                    </div>
                </div>

            </div>
            <div className="endBar">
                {messageVisible === true ? <MessageBar message={message} loading={loadingMessage}/> : <div className="messages"></div>}
                <div className="connectionInfo">
                    <div className="connectionStatus">
                        <p>{props.connected === true ? "Connected" : "Disconnected"}</p>
                    </div>
                    { props.connected === true ? <div className="connectionURL">
                        <p>{props.connectionURL}</p>
                    </div> : <></>}
                </div>
            </div>
        </div>
    )
}

export default RoutineDisplay