import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import '../../Styles/RoutineDisplay/RoutineDispMain.css'

const RoutineDisplay = () => {
    const [searchParams, updateSearchParams] = useSearchParams();

    const getSearchParams = () => {
        console.log(searchParams.get("routineID"));
        return searchParams.get("routineID");
    }

    return (
        <div className="routineDisplay">
            <p>{getSearchParams()}</p>
        </div>

    )
}

export default RoutineDisplay