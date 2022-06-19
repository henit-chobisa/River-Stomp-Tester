import { useState } from "react"
import RoutineItem from "./Components/RoutinePage/RoutineItem";
import "./Styles/RoutinePage.css"
import SideBar from "./Components/RoutinePage/SideBar";
import React from 'react';
import PlusButton from "./Components/RoutinePage/PlusButton";
import OperationsPanel from "./Components/RoutinePage/OperationPanel";

const RoutinePage = (props) => {

    const [routines, updateRoutines] = useState([]);
    const [selectedRoutine, updateSelectedRoutine] = useState(null);

    const renderRoutineItems = () => {
        if (routines.length === 0 ) {
            return (
                <RoutineItem present={false}/>
            )
        }
        else {
            return routines.map((routine, index) => {
                return <RoutineItem present={true} index={index} isActive={routine.isActive} clickHandler={handleRoutineItemClicked} routine={routine} />
            })
        }
    }

    const handleRoutineItemClicked = (index) => {
        const clone = [...routines];
        if (selectedRoutine !== null){
            clone[selectedRoutine].isActive = false; 
        }

        clone[index].isActive = true;
        updateRoutines(clone);
    }

    const addRoutine = (routine) => {
        const clone = [...routines];
        clone.push(routine);
        updateRoutines(clone);
    }

    return (
        <div className="routinePage">
            <div className="routinesBar">
                <SideBar id={"routineSideBar"} title={"Routines"}/>
                <div className="routinesGroup">
                    {renderRoutineItems()}
                </div>
                <div className="utilDivider"></div>
                <div className="utilsDiv">
                    <PlusButton></PlusButton>
                </div>

            </div>
            <div className="operationsBar">
                <div className="operations">
                    <OperationsPanel addRoutine={addRoutine}/>
                </div>
            </div>
        </div>
    );
}

export default RoutinePage;