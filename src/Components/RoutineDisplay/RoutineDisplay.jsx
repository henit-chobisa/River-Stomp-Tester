import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import '../../Styles/RoutineDisplay/RoutineDispMain.css'
import logo from '../../Assets/logo.png'
import { CircularProgress } from "@mui/material";
import theme from "../Generic/Theme";
import { ThemeProvider } from "@mui/system";
import OptionButton from "../RoutinePage/OperationPanel/OptionButton";
import testRoutineData from "../../Assets/testRoutineData";
import OptionWrapper from "./Components/OptionWrapper";
import SubRoutineItem from "./Components/SubRoutineItem";
import { useRef } from "react";

const RoutineDisplay = () => {
    const [searchParams, updateSearchParams] = useSearchParams();
    const [selectedIndex, updateSelectedIndex] = useState(null);
    const [subRoutines, updateSubRoutines] = useState(testRoutineData.routines);
    const [runTime, updateRunTime] = useState(true);
    const subRoutineGroupComponent = useRef();
    const [subRoutineUpdateStatus, updateSRUS] = useState(0);

    useEffect(() => {
        if (subRoutineUpdateStatus === 1){
            if (subRoutines.length > 2){
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
        const clone = [...options];
        if (selectedIndex !== null) {
            clone[selectedIndex].isSelected = false;
        }
        updateSelectedIndex(index);
        clone[index].isSelected = true;
        updateOptions(clone);
    }

    const renderOptions = () => {
        return options.map((option, index) => (<OptionButton key={index} onClickOption={handleOptionClickCallback} index={index} isSelected={option.isSelected} title={option.title} />));
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
                    <OptionWrapper data={subRoutines} selection={selectedIndex} addSubRoutine={addSubRoutine}/>
                </div>
            )
        }
    }

    const addSubRoutine = (subRoutineObject) => {
        const clone = [...subRoutines];
        clone.push(subRoutineObject);
        updateSubRoutines(clone);
        updateSRUS(1);
    }


    const getSearchParams = () => {
        console.log(searchParams.get("routineID"));
        return searchParams.get("routineID");
    }

    const loadSubRoutines = () => {
        return subRoutines.map((routine, index) => {
            return (
                <SubRoutineItem key={index} index={index} runTime={runTime} subRoutine={routine}/>
            )
        })
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

                </div>
            </div>
            <div className="endBar">
                <div className="messages">
                    <p className="messageTitle">Initiating Subscriptions...</p>
                    <ThemeProvider theme={theme}>
                        <CircularProgress color="primary" size={"15px"} />
                    </ThemeProvider>
                </div>
                <div className="connectionInfo">
                    <div className="connectionStatus">
                        <p>Connected</p>
                    </div>
                    <div className="connectionURL">
                        <p>http://localhost:9000/disprout</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RoutineDisplay