import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import '../../Styles/RoutineDisplay/RoutineDispMain.css'
import logo from '../../Assets/logo.png'

const RoutineDisplay = () => {
    const [searchParams, updateSearchParams] = useSearchParams();

    const getSearchParams = () => {
        console.log(searchParams.get("routineID"));
        return searchParams.get("routineID");
    }

    return (
        <div className="routineDisplay">
            <div className="topBar">
                <div className="logo">
                    <img className="logoIMG" src={logo} alt="" />
                </div>
            </div>
            <div className="middleBar">
                <div className="utilities">

                </div>
                <div className="subRoutines">
                    
                </div>
            </div>
            <div className="endBar">

            </div>
        </div>

    )
}

export default RoutineDisplay