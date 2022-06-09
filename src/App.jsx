import React from 'react';
import "./Styles/App.css";
import logo from "./Assets/logo.png"
import { useState } from 'react';
import soundOnIcon from './Assets/soundOn.png'
import soundOffIcon from './Assets/soundOff.png'
import { useEffect } from 'react';
import { Switch } from '@mui/material';
import SimpleTestingPage from './SimpleTestinPage';
import Storehandler from './Utilities/renderer';
import RoutinePage from './RoutinePage';


const App = (props) => {
    const [connectionURL, updateConnectionURL] = useState(props.conURL);
    const [error, updateError] = useState(props.error);
    const [soundOn, updateSoundOn] = useState(true);
    const [isConnected, updateIsConnected] = useState(props.isConnected);
    const [checked, setChecked] = useState(false);
    const [mode, updateMode] = useState("Simple Mode")

    const handleChange = (event) => {
        if (event.target.checked) {
            updateMode("Routine Mode");
        }
        else {
            updateMode("Simple Mode");
        }
        setChecked(event.target.checked);
    };
    const store = Storehandler();

    const updateInputValue = (evt) => {
        updateConnectionURL(evt.target.value);
    }

    useEffect(() => {
        if (isConnected === false) {
            var connectionurl = store.getURL();
            updateConnectionURL(connectionurl);
        }
    }, []);

    useEffect(() => {
        if (error !== "") {
            setTimeout(() => {
                updateError("");
            }, 5000);
        }
    }, [error])

    const handleSound = async () => {
        soundOn === true ? updateSoundOn(false) : updateSoundOn(true)
    }

    const connect = () => {
        store.saveURL(connectionURL);
        isConnected === true ? props.disconnection() : props.handleURL(connectionURL);
    }

    const handleKeyPress = (evt) => {
        if (evt.key === "Enter"){
            connect();
        }
    }

    return (
        <div className='App'>
            <div className='upperBar'>
                <div className='controlS'>
                    <img className="logo" src={logo} alt="" />
                    <div className='control'>
                        <Switch
                            className='controlSwitch'
                            checked={checked}
                            onChange={handleChange}
                            color="info"
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                        <p className='mode'>{mode}</p>
                    </div>
                </div>

                <div className='cd'>
                    <input className='urlFeild' onKeyPress={handleKeyPress} type="url" value={connectionURL}
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
            {props.isConnected ? checked === false ? <SimpleTestingPage soundOn={soundOn} updateError={updateError} /> : <RoutinePage /> : <div className='connectionWarning'>No Server Connected, Kindle connect first.</div>}
            {error !== "" ? <div className='errorBox'>
                {error}
            </div> : <></>}
        </div>

    );
}

export default App;