import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StompSessionProvider, useStompClient } from 'react-stomp-hooks';
import { useState } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));

function Comp(){
  const [connectionURL, updateConnectionURL] = useState("");
  const [error, updateError] = useState("")
  const handleURLUpdate = (url) => {
    console.log(url);
    updateConnectionURL(url);
    return url;
  }
  const handleDisconnection = () => {
    updateConnectionURL("");
  }

  const handleConnection = () => {
    console.log("Connected");
  }
  const nullClient = () => {
  }

  const handleStompError = (err) => {
    console.log("ERROR");
    if (err === undefined){
      updateError("Connection Error to Server, please check your server.");
    }
    updateError(err);
  }

  const handleStompDisconnect = () => {
    updateError("Socket Disconnect, Trying Again.");
  }

  const handleStateChange = (State) => {
    console.log(State);
  }

  return (
    connectionURL === "" ? <React.StrictMode>
      <App handleURL={handleURLUpdate} getClient={nullClient} disconnection={handleDisconnection} error={error} isConnected={false} conURL={""}/>
    </React.StrictMode> : (
      <React.StrictMode>
        <StompSessionProvider url={connectionURL} onConnect={handleConnection} onStompError={handleStompError} onDisconnect={handleStompDisconnect} onWebSocketError={handleStompError} onChangeState={handleStateChange}>
          <App handleURL={handleURLUpdate} getClient={useStompClient} isConnected={true} disconnection={handleDisconnection} conURL={connectionURL} error={error}/>
        </StompSessionProvider>
      </React.StrictMode>
    )
  );

}

root.render(
  <Comp />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
