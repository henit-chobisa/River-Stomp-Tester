import { useState } from "react"
import RoutineItem from "./Components/RoutinePage/routineItem";
import "./Styles/RoutinePage.css"

const RoutinePage = (props) => {

    return (
        <div className="routinePage">
            <div id="routineGroup" className="sideBar">
                <h2>Routines</h2>
            </div>

            {/* <div className="routineList">
                <RoutineItem present={true}/>
            </div> */}
        </div>
    );
}

export default RoutinePage;