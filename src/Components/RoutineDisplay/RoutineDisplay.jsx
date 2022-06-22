import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import '../../Styles/RoutineDisplay/RoutineDispMain.css'
import logo from '../../Assets/logo.png'
import { CircularProgress } from "@mui/material";
import theme from "../Generic/Theme";
import { ThemeProvider } from "@mui/system";

const RoutineDisplay = () => {
    const [searchParams, updateSearchParams] = useSearchParams();

    const getSearchParams = () => {
        console.log(searchParams.get("routineID"));
        return searchParams.get("routineID");
    }

    return (
        <div className="routineDisplay">
            <div className="topBar">
                <div className="leftBar">
                    <div className="logo">
                        <img className="logoIMG" src={logo} alt="" />
                    </div>
                    <div className="routineName">
                        <p>Routine Name</p>
                    </div>
                </div>
                <div className="rightBarTitle">
                    R i v e r
                </div>
            </div>
            <div className="middleBar">
                <div className="utilities">

                </div>
                <div className="subRoutines">

                </div>
            </div>
            <div className="endBar">
                <div className="messages">
                    <p className="messageTitle">Initiating Subscriptions...</p>
                    <ThemeProvider theme={theme}>
                        <CircularProgress color="primary" size={"15px"}/>
                    </ThemeProvider>
                </div>
                <div className="connectionInfo">
                    <div className="connectionStatus">
                        <p>Connected</p>
                    </div>
                    <div className="connectionURL">
                        <p>http://localhost:9000/disprout</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RoutineDisplay