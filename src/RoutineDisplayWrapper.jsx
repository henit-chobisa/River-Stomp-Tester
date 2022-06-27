import RoutineDisplay from "./Components/RoutineDisplay/RoutineDisplay";
import './Styles/RoutineDisplay/RoutineExec.css'
import React, { useEffect } from "react";
import Storehandler from "./Utilities/renderer";
import { useState } from "react";
import { StompSessionProvider } from "react-stomp-hooks";

const RoutineDisplayWrapper = (props) => {


    const store = Storehandler();
    const [connectionURL, updateConnectionURL] = useState("");

    useEffect(() => {
        updateConnectionURL(store.getURL());
    })

    const renderView = () => {
        if (connectionURL === "") {
            return (
                <div className="routineExec">
                    <RoutineDisplay connected={false} />
                </div>
            )
        }
        else {
            return (
                <StompSessionProvider url={connectionURL}>
                    <div className="routineExec">
                        <RoutineDisplay connected={true} connectionURL={connectionURL} />
                    </div>
                </StompSessionProvider>
            )
        }
    }
    return renderView();
}

export default RoutineDisplayWrapper;