import { useState } from "react"
import RoutineItem from "./Components/RoutinePage/RoutineItem";
import "./Styles/RoutinePage.css"
import SideBar from "./Components/RoutinePage/SideBar";
import React from 'react';

const RoutinePage = (props) => {

    return (
        <div className="routinePage">
            <div className="routinesBar">
                <SideBar id={"routineSideBar"} title={"Routines"}/>
                <div className="routinesGroup">
                    <RoutineItem present={true}/>
                </div>
            </div>

            {/* <div className="routineList">
                <RoutineItem present={true}/>
            </div> */}
        </div>
    );
}

export default RoutinePage;