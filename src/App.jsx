import React, { Component } from 'react';
import "./App.css";
import logo from "./logo.png"
import JSONInput from "react-json-editor-ajrm"
import locale from 'react-json-editor-ajrm/locale/en'

import {
    StompSessionProvider,
    useSubscription,
} from "react-stomp-hooks";
class App extends Component {

    state = {
        connectionURL: "",
        connectionStatus: "DISCONNECTED",
    }

    updateInputValue = (evt) => {
        this.setState({
            connectionURL: evt.target.value
        });
    }


    connectToStomp = () => {
        this.setState({ connectionStatus: "CONNECTED" });
    }

    data = {
        "hello": "My name is Henit",
    }


    render() {
        return (
            <div className='App'>
                {(this.state.connectionStatus === "CONNECTED") ? <StompSessionProvider url={this.state.connectionURL}></StompSessionProvider> : <></>}
                <div className='upperBar'>
                    <img className="logo" src={logo} alt="" />
                    <div className='cd'>
                        <input className='urlFeild' type="url"
                            placeholder="Enter a Url to an stomp endpoint"
                            onChange={this.updateInputValue}
                        />
                        <button className='connectionButton' onClick={this.connectToStomp} id='cB' style={{ color: "green" }}>{(this.state.connectionStatus === "DISCONNECTED") ? "Connect" : "Connected"}</button>
                    </div>
                    <h3 className="title" style={{ color: "White" }}>R i v e r</h3>
                </div>

                <div className='bottomBar'>

                    <div className='subscriptionBar'>
                        <div className='subsTitleBar'>
                            Send Message
                            {/* <div>
                                <input type="text" className='subAddText' />
                                <button>
                                    Add
                                </button>
                            </div> */}
                        </div>
                        <div className='subsEditor'>
                            <JSONInput
                                id='a_unique_id'
                                placeholder={this.data}
                                locale={locale}
                                height="100%"
                                width="100%"
                                // margin="0.5%"
                            />
                        </div>
                        
                        <div className='senderBar'>
                            <input className='channelInputBar' type="text" name="" id="" placeholder='Enter the channel to send' />
                            <button className='channelSendButton'>
                                Send
                            </button>

                        </div>

                    </div>
                    <div className='resultBar'>

                    </div>
                </div>
                <div className='bottomTitle'>
                    <p>v1.0.0 Designed and Developed By Henit Chobisa</p>
                </div>
            </div>
        );
    }
}

export default App;