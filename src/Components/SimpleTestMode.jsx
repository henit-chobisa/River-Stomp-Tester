
import App from "../App";
import React from 'react';
import { StompSessionProvider, useStompClient } from "react-stomp-hooks";

const SimpleTestMode = (props) => {
    return (
        props.connectionURL === "" ?
            <App handleURL={props.handleURLUpdate} getClient={() => {}} disconnection={props.handleDisconnection} error={props.error} isConnected={false} conURL={""} />
        : (
                <StompSessionProvider url={props.connectionURL} onConnect={props.handleConnection} onStompError={props.handleStompError} onDisconnect={props.handleStompDisconnect} onWebSocketError={props.handleStompError} onChangeState={props.handleStateChange}>
                    <App handleURL={props.handleURLUpdate} getClient={useStompClient} isConnected={true} disconnection={props.handleDisconnection} conURL={props.connectionURL} error={props.error} />
                </StompSessionProvider>
        )
    );
}

export default SimpleTestMode;