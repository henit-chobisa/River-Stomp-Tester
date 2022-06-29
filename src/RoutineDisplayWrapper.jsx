import RoutineDisplay from "./Components/RoutineDisplay/RoutineDisplay";
import './Styles/RoutineDisplay/RoutineExec.css'
import React, { useEffect } from "react";
import Storehandler from "./Utilities/renderer";
import { useState } from "react";
import { StompSessionProvider, useStompClient } from "react-stomp-hooks";

const RoutineDisplayWrapper = (props) => {


    const store = Storehandler();
    const [connectionURL, updateConnectionURL] = useState("");

    useEffect(() => {
        updateConnectionURL(store.getURL());
    })

    const nullFunc = () => {}

    const renderView = () => {
        if (connectionURL === "") {
            return (
                <div className="routineExec">
                    <RoutineDisplay connected={false} sclient={nullFunc} />
                </div>
            )
        }
        else {
            return (
                <StompSessionProvider url={connectionURL}>
                    <div className="routineExec">
                        <RoutineDisplay connected={true} sclient={useStompClient} connectionURL={connectionURL} />
                    </div>
                </StompSessionProvider>
            )
        }
    }
    return renderView();
}

export default RoutineDisplayWrapper;