import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { StompSessionProvider, useStompClient } from 'react-stomp-hooks';
import { useState } from 'react';


const root = ReactDOM.createRoot(document.getElementById('root'));

function Comp(){

  const [connectionURL, updateConnectionURL] = useState("");
  const handleURLUpdate = (url) => {
    console.log(url);
    updateConnectionURL(url);
    return url;
  }

  const handleConnection = () => {
    console.log("Connected");
  }
  const nullClient = () => {
  }

  return (
    connectionURL === "" ? <React.StrictMode>
      <App handleURL={handleURLUpdate} getClient={nullClient} isConnected={false} conURL={""}/>
    </React.StrictMode> : (
      <React.StrictMode>
        <StompSessionProvider url={connectionURL} onConnect={handleConnection}>
          <App handleURL={handleURLUpdate} getClient={useStompClient} isConnected={true} conURL={connectionURL}/>
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
reportWebVitals();
