import RoutineDisplay from "./Components/RoutineDisplay/RoutineDisplay";
import './Styles/RoutineDisplay/RoutineExec.css'
import React from "react";

const RoutineDisplayWrapper = (props) => {

    return (
        <div className="routineExec">
            <RoutineDisplay/>
        </div>
    )
}

export default RoutineDisplayWrapper;