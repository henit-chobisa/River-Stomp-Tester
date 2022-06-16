import { useState } from "react"
import RoutineItem from "./Components/RoutinePage/RoutineItem";
import "./Styles/RoutinePage.css"
import SideBar from "./Components/RoutinePage/SideBar";
import React from 'react';
import PlusButton from "./Components/RoutinePage/PlusButton";

const RoutinePage = (props) => {

    const [routines, updateRoutines] = useState([]);

    const renderRoutineItems = () => {
        if (routines.length === 0 ) {
            return (
                <RoutineItem present={false}/>
            )
        }
        else {
            return routines.map((routine) => {
                return <RoutineItem present={true} title={routine.title} lastUpdated={routine.lastUpdated} />
            })
        }
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
                <div className="statisticsPanel">

                </div>
                <div className="observationsPanel">
                    
                </div>

            </div>

            {/* <div className="routineList">
                <RoutineItem present={true}/>
            </div> */}
        </div>
    );
}

export default RoutinePage;