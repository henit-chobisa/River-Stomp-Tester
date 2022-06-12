import { useState } from "react"
import RoutineItem from "./Components/RoutinePage/routineItem";
import "./Styles/RoutinePage.css"
import SideBar from "./Components/RoutinePage/SideBar";

const RoutinePage = (props) => {

    return (
        <div className="routinePage">
            <div className="routinesBar">
                <SideBar title={"Routines"}/>
                <div className="routinesGroup">
                    <RoutineItem/>
                </div>
            </div>

            {/* <div className="routineList">
                <RoutineItem present={true}/>
            </div> */}
        </div>
    );
}

export default RoutinePage;