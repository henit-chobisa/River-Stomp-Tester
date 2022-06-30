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
import { CircularProgress, useThemeProps } from "@mui/material";
import theme from "../Generic/Theme";
import { ThemeProvider } from "@mui/system";
import { resolve } from "path";

const RoutineDisplay = (props) => {
    const [searchParams, updateSearchParams] = useSearchParams();
    const [selectedIndex, updateSelectedIndex] = useState(null);
    const [subRoutines, updateSubRoutines] = useState([]);
    const [initLoad, updateInitLoad] = useState(true);
    const [selectedSubRoutine, updateSelectedSubRoutine] = useState(null);
    const [runTime, updateRunTime] = useState(false);
    const subRoutineGroupComponent = useRef();
    const [subRoutineUpdateStatus, updateSRUS] = useState(0);
    const [messageVisible, updateMessageVisible] = useState(false);
    const [message, updateMessage] = useState(false);
    const [loadingMessage, updateLoadingMessage] = useState(false);
    const store = Storehandler();
    const client = props.sclient();
    const [targetRoutine, updateTargetRoutine] = useState({});


    // Generic Functions 
    const getTargetRoutineID = () => {
        return searchParams.get("routineID");
    }

    const showMessage = async (message, isLoading, time) => {
        updateMessage(message);
        updateLoadingMessage(isLoading);
        updateMessageVisible(true);
    }

    const publishMessage = (destination, body, headers) => {
        const startTime = performance.now();
        client.publish({ destination, body, headers })
        const endTime = performance.now();
        const executionTime = parseFloat((Math.round((endTime - startTime) * 100) / 100).toFixed(2));
        const dataExchange = (Buffer.from(body).length) + (Buffer.from(headers).length);
        return {executionTime, dataExchange};
    }

    const initalSubRoutineExecProcess = (index) => {
        scrollSubRoutineInView(index);
        updateSelectedSubRoutine(index);
    }

    const ExecuteRoutine = async () => {
        updateRunTime(true);
        const clone = [...subRoutines];
        for (const [index, subRoutine] of subRoutines.entries()) {
            initalSubRoutineExecProcess(index)
            if (subRoutine.operation === "PUBLISH"){
                await new Promise((resolve) => {
                    showMessage(`Executing Publish SubRoutine : ${subRoutine.title}, at ${subRoutine.route}`, true)
                    const performance = publishMessage(subRoutine.route, subRoutine.body, subRoutine.headers)
                    clone[index].executionTime = performance.executionTime;
                    clone[index].dataBytes = performance.dataExchange;

                    setTimeout(() => {
                        updateMessageVisible(false);
                        resolve();
                    }, 3000);
                })
            }
            else {
                await new Promise((resolve) => {
                    showMessage(`Waiting for Subscribe SubRoutine : ${subRoutine.title}`, true);

                    setTimeout(() => {
                        updateMessageVisible(false);
                        resolve();
                    }, 3000);
                })
            }
            
        }
        
        updateSubRoutines(clone);
        updateSelectedIndex(1);
        updateSRUS(1);
        scrollSubRoutineInView(0);
        updateSelectedSubRoutine(0);
        updateRunTime(false);
    }
    // Generic Functions


    // UseEffect for Updating the Routine in the database
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

            if (props.connected === true) {
                setTimeout(() => {
                    showMessage(`Routine System Connected with ${props.connectionURL}`, false);
                    setTimeout(() => {
                        updateMessageVisible(false);
                    }, 5000)
                }, 2000);
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
                scrollSubRoutineInView(subRoutines.length - 1);
                updateSRUS(0);
            }
        }
    }, [subRoutineUpdateStatus]);


    // Option Controls 

    const [options, updateOptions] = useState([
        { title: "Routine Map", isSelected: false },
        { title: "Statistics", isSelected: false },
        { title: "Observations", isSelected: false },
        { title: "Create Subroutine", isSelected: false }
    ]);

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
        if (subRoutines.length > 0) {
            return options.map((option, index) => (<OptionButton key={index} onClickOption={handleOptionClickCallback} index={index} isSelected={option.isSelected} title={option.title} />));
        }
        else {
            return options.filter((option, index) => {
                return index === 3;
            }).map((option, index) => (<OptionButton key={index} onClickOption={handleOptionClickCallback} index={3} isSelected={option.isSelected} title={option.title} />));
        }

    }

    // Option Controls


    // SubRoutine Controls

    const loadSubRoutines = () => {
        return subRoutines.map((routine, index) => {
            return (
                <SubRoutineItem key={index} index={index} runTime={index === selectedSubRoutine ? runTime : false} selectSubRoutine={selectSubRoutine} deleteRoutine={deleteRoutine} isSelected={selectedSubRoutine === index} subRoutine={routine} />
            )
        })
    }

    const scrollSubRoutineInView = (pos) => {
        subRoutineGroupComponent.current.getElementsByClassName("subRoutineItem")[pos].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
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
        if (index === selectedSubRoutine) {
            updateSelectedSubRoutine(null);
        }
        clone.splice(index, 1);
        updateSubRoutines(clone);
        updateSRUS(2);
    }
    const selectSubRoutine = (index) => {
        updateSelectedSubRoutine(index);
    }
    const updateSubRoutineItem = (pos, subRoutine) => {
        const clone = [...subRoutines];
        clone.map((srout, index) => {
            if (index === pos) {
                return subRoutine;
            }
            return srout;
        })
        updateSubRoutines(clone);
        updateSRUS(1);

        setTimeout(() => {
            updateMessageVisible(false);
        }, 3000);

        if (selectedIndex !== null) {
            handleOptionClickCallback(selectedIndex);
        }

    }

    // SubRoutine Controls


    // SubRoutine Manager
    const renderSubRoutineManager = () => {
        if (selectedSubRoutine === null) {
            return (
                <div className="nullWarning">
                    <p>Select a subRoutine for getting solo run info</p>
                </div>
            )
        }
        else {
            return (<SubRoutineManager SubRoutine={subRoutines[selectedSubRoutine]} index={selectedSubRoutine} updateSubRoutineColl={updateSubRoutineItem} />)
        }
    }
    // SubRoutine Manager

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
                        <div className="runnerButton" onClick={ExecuteRoutine}>
                            {runTime === false ? <div className="tria"></div>
                                : <ThemeProvider theme={theme}>
                                    <CircularProgress color="primary" size={"15px"} />
                                </ThemeProvider>}
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
                {messageVisible === true ? <MessageBar message={message} loading={loadingMessage} /> : <div className="messages"></div>}
                <div className="connectionInfo">
                    <div className="connectionStatus">
                        <p>{props.connected === true ? "Connected" : "Disconnected"}</p>
                    </div>
                    {props.connected === true ? <div className="connectionURL">
                        <p>{props.connectionURL}</p>
                    </div> : <></>}
                </div>
            </div>
        </div>
    )
}

export default RoutineDisplay