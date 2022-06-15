import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import '../../Styles/RoutineDisplay/RoutineDispMain.css'

const RoutineDisplay = () => {
    const [searchParams, updateSearchParams] = useSearchParams();

    const getSearchParams = () => {
        return searchParams.get("routineID");
    }

    return (
        <div className="routineDisplay">

        </div>

    )
}

export default RoutineDisplay