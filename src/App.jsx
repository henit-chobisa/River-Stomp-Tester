import React, { Component } from 'react';
import "./App.css";
import logo from "./logo.png"
import {
    StompSessionProvider,
    useSubscription,
  } from "react-stomp-hooks";
class App extends Component {

    state = { 
        connectionURL : "",
        connectionStatus : "DISCONNECTED",
     } 

     updateInputValue = (evt) => {
        this.setState({
          connectionURL: evt.target.value
        });
      }


    connectToStomp = () => {
        this.setState({connectionStatus : "CONNECTED"});
    }

    

    render() { 
        return (
            <div className='App'>
                {(this.state.connectionStatus === "CONNECTED") ? <StompSessionProvider url={this.state.connectionURL}></StompSessionProvider> : <></>}
                <div className='upperBar'>
                     <img className = "logo" src={logo} alt="" />
                     <div className='cd'>
                        <input className='urlFeild' type="url"
                            placeholder="Enter a Url to an stomp endpoint"
                            onChange={this.updateInputValue}
                        />
                        <button className='connectionButton' onClick={this.connectToStomp} id='cB' style={{color:"green"}}>{(this.state.connectionStatus === "DISCONNECTED") ? "Connect" : "Connected"}</button>
                     </div>
                     <h3 className = "title" style={{color : "White"}}>Themis Message Testing Utility</h3>
                </div>
            </div>
        );
    }
}
 
export default App;