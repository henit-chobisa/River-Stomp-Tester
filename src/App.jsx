import React from 'react';
import "./Styles/App.css";
import logo from "./Assets/logo.png"
import { useState } from 'react';
import soundOnIcon from './Assets/soundOn.png'
import soundOffIcon from './Assets/soundOff.png'
import { useEffect } from 'react';
import SimpleTestingPage from './SimpleTestinPage';

const App = (props) => {
    const [connectionURL, updateConnectionURL] = useState(props.conURL);
    const [error, updateError] = useState(props.error);
    const [soundOn, updateSoundOn] = useState(true);
    const isConnected = props.isConnected;

    const updateInputValue = (evt) => {
        localStorage.setItem("ConnectionURL", evt.target.value);
        updateConnectionURL(evt.target.value);
    }

    useEffect(() => {
        var connectionURL = localStorage.getItem("ConnectionURL");
        updateConnectionURL(connectionURL);
    }, []);

    useEffect(() => {
        if (error !== ""){
            setTimeout(() => {
                updateError("");
            }, 5000);
        }
    }, [error])

    const handleSound = () => {
        soundOn === true ? updateSoundOn(false) : updateSoundOn(true)
    }

    const connect = () => {
        isConnected === true ? props.disconnection() : props.handleURL(connectionURL);
    }


    return (
        <div className='App'>
            <div className='upperBar'>
                
                <img className="logo" src={logo} alt="" />
                <div className='cd'>
                    <input className='urlFeild' type="url" value={connectionURL}
                        placeholder="Enter a Url to an stomp endpoint"
                        onChange={updateInputValue}
                    />
                    <button className='connectionButton' onClick={connect} id='cB'>{(isConnected === false) ? "Connect" : "Disconnect"}</button>
                </div>

                <div className="appTitle">
                    <img src={soundOn === true ? soundOnIcon : soundOffIcon} onClick={handleSound} style={{ height: "50%", width: "10%", padding: "15px" }} alt="" />
                    <h3 className="title" style={{ color: "White" }}>R i v e r</h3>
                </div>

            </div>

            {props.isConnected ? <SimpleTestingPage soundOn={soundOn} updateError={updateError}/> : <div className='connectionWarning'>No Server Connected, Kindle connect first.</div>}
            {error !== "" ? <div className='errorBox'>
                {error}
            </div> : <></>}
        </div>
    );
}

export default App;