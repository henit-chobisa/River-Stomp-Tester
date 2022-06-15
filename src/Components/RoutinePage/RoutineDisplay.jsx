import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import '../../Styles/RoutineDisplay/RoutineDispMain.css'

const RoutineDisplay = () => {

    const [count, updateCount] = useState(0);
    const [searchParams, updateSearchParams] = useSearchParams();

    const getSearchParams = () => {
        console.log(searchParams);
        return searchParams.get("routineID");
    }

    const increaseCount = () => {
        updateCount(count + 1);
    }

    return (
        <div className="routineDisplay">
            <h1>{getSearchParams()}</h1>
        </div>

    )
}

export default RoutineDisplay