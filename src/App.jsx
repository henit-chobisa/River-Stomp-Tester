import { useSetState } from '@mantine/hooks';
import React, { Component } from 'react';
import "./App.css";
import logo from "./spring-boot-logo-removebg-preview.png"
import Stomp from "stompjs"
import Websocket from "ws"
import sockjsclient from "sockjs-client"
class App extends Component {

    state = { 
        connectionURL : "",
        connectionStatus : "DISCONNECTED"
     } 

     updateInputValue = (evt) => {
        const val = evt.target.value;
        console.log(val);
        this.setState({
          connectionURL: evt.target.value
        });
      }


    connectToStomp = () => {
        var sock = new sockjsclient(this.state.connectionURL);
        var stompclient = Stomp.over(sock);

        stompclient.connect({}, () => {
            this.setState({connectionStatus : "CONNECTED"})
        })
    }

    

    render() { 
        return (
            <div className='App'>
                <div className='upperBar'>
                     <img className = "logo" src={logo} alt="" />
                     <div className='cd'>
                        <input className='urlFeild' type="url"
                            placeholder="Enter a Url to an stomp endpoint"
                            // value={this.state.connectionURL}
                            onChange={this.updateInputValue}
                        />
                        <button className='connectionButton' onClick={this.connectToStomp} id='cB' style={{color:"green"}}>{(this.state.connectionStatus === "DISCONNECTED") ? "Connect" : "Disconnect"}</button>
                     </div>
                     <h3 className = "title" style={{color : "White"}}>Themis Message Testing Utility</h3>
                </div>
            </div>
        );
    }
}
 
export default App;