import { useState } from "react"
import RoutineItem from "./Components/RoutinePage/RoutineItem";
import "./Styles/RoutinePage.css"
import SideBar from "./Components/RoutinePage/SideBar";
import React from 'react';
import PlusButton from "./Components/RoutinePage/PlusButton";
import OperationsPanel from "./Components/RoutinePage/OperationPanel";
import { useRef } from "react";
import { useEffect } from "react";

const RoutinePage = (props) => {

    const [routines, updateRoutines] = useState([]);
    const [selectedRoutine, updateSelectedRoutine] = useState(null);
    const [routineChange, updateRoutineChange] = useState(0);
    // O for all good and 1 for something is changed;
    const routineList = useRef();

    const renderRoutineItems = () => {
        if (routines.length === 0) {
            return (
                <RoutineItem present={false} />
            )
        }
        else {
            return routines.map((routine, index) => {
                return <RoutineItem present={true} index={index} isActive={routine.isActive} clickHandler={handleRoutineItemClicked} deleteHandler={handleRoutineItemDelete} routine={routine} />
            });
        }
    }

    useEffect(() => {
        if (routineChange === 1){
            routineList.current.getElementsByClassName("routineItem")[routines.length - 1].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            updateRoutineChange(0);
        }
    }, [routineChange, routines])

    const handleRoutineItemDelete = (index) => {
        const clone = [...routines];
        clone.splice(index, 1);
        if (selectedRoutine === index) {
            updateSelectedRoutine(null);
        }
        updateRoutines(clone);
    }

    const handleRoutineItemClicked = (index) => {
        const clone = [...routines];
        if (selectedRoutine !== null) {
            clone[selectedRoutine].isActive = false;
        }

        clone[index].isActive = true;
        
        updateSelectedRoutine(index);
        updateRoutines(clone);
    }

    const addRoutine = (routine) => {
        const clone = [...routines];
        var contains = false;
        clone.map((rout) => {
            if (rout.title === routine.title) {
                contains = true;
            }
        })

        if (contains === false) {
            clone.push(routine);
            updateRoutines(clone);
            updateRoutineChange(1);
        }
    }

    return (
        <div className="routinePage">
            <div className="routinesBar">
                <SideBar id={"routineSideBar"} title={"Routines"} />
                <div className="routinesGroup" ref={routineList}>
                    {renderRoutineItems()}
                </div>
                <div className="utilDivider"></div>
                <div className="utilsDiv">
                    <PlusButton></PlusButton>
                </div>

            </div>
            <div className="operationsBar">
                <div className="operations">
                    <OperationsPanel addRoutine={addRoutine} />
                </div>
            </div>
        </div>
    );
}

export default RoutinePage;