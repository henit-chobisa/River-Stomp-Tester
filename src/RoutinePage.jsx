import { useState } from "react"
import RoutineItem from "./Components/RoutinePage/routineItem";
import "./Styles/RoutinePage.css"

const RoutinePage = (props) => {

    return (
        <div className="routinePage">
            <div className="titleBar">
                <h2>Routines</h2>
                {/* <div className="createRoutine">
                    <p>Create Routine</p>
                </div> */}
            </div>
            <div className="routineList">
                <RoutineItem/>
            </div>
        </div>
    );
}

export default RoutinePage;