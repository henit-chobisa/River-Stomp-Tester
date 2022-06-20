import { useState } from "react"
import RoutineItem from "./Components/RoutinePage/RoutineItem";
import "./Styles/RoutinePage.css"
import SideBar from "./Components/RoutinePage/SideBar";
import React from 'react';
import PlusButton from "./Components/RoutinePage/PlusButton";
import OperationsPanel from "./Components/RoutinePage/OperationPanel";
import Storehandler from "./Utilities/renderer";
import { useRef } from "react";
import { useEffect } from "react";

const RoutinePage = () => {

    const [routines, updateRoutines] = useState([]);
    const [selectedRoutine, updateSelectedRoutine] = useState(null);
    const [routineChange, updateRoutineChange] = useState(0);
    const [initLoad, updateInitLoad] = useState(true);
    // O for all good ,1 routines changed, 2 for routines deleted;
    const routineList = useRef();
    const store = Storehandler();

    const renderRoutineItems = () => {
        if (routines.length === 0) {
            return (
                <RoutineItem present={false} />
            )
        }
        else {
            return routines.map((routine, index) => {
                return <RoutineItem key={index} present={true} index={index} isActive={routine.isActive} clickHandler={handleRoutineItemClicked} deleteHandler={handleRoutineItemDelete} routine={routine} />
            });
        }
    }

    useEffect(() => {
        if (initLoad === true){
            const storedRoutines = store.getRoutines();
            if (storedRoutines === undefined){
                store.setRoutines(JSON.stringify(routines));
            }
            else {
                var arrRoutines = JSON.parse(storedRoutines);
                arrRoutines.map((routine) => {
                    return routine.isActive = false;
                })
                updateRoutines(arrRoutines);
            }
            updateInitLoad(false);
        }

        if (routineChange !== 0){
            store.setRoutines(JSON.stringify(routines));
        }

        if (routineChange === 1){
            routineList.current.getElementsByClassName("routineItem")[routines.length - 1].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
            updateRoutineChange(0);
        }
    }, [routineChange, routines, initLoad])

    const handleRoutineItemDelete = (index) => {
        const clone = [...routines];
        clone.splice(index, 1);
        if (selectedRoutine === index) {
            updateSelectedRoutine(null);
        }
        updateRoutines(clone);
        updateRoutineChange(2);
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
                    <OperationsPanel addRoutine={addRoutine} selectedRoutine={selectedRoutine === null ? null : routines[selectedRoutine]}/>
                </div>
            </div>
        </div>
    );
}

export default RoutinePage;