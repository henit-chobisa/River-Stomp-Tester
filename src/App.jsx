import React, { Component } from 'react';
import "./App.css";
import logo from "./logo.png"
import JSONInput from "react-json-editor-ajrm"
import locale from 'react-json-editor-ajrm/locale/en'
import testData from './testData';
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

import {
    StompSessionProvider,
    useSubscription,
} from "react-stomp-hooks";


const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1} </span>${line}`)
    .join("\n");

class App extends Component {


    state = {
        connectionURL: "",
        connectionStatus: "DISCONNECTED",
        data: "\t // Input your JSON here"
    }

    updateInputValue = (evt) => {
        this.setState({
            connectionURL: evt.target.value
        });
    }


    connectToStomp = () => {
        this.setState({ connectionStatus: "CONNECTED" });
    }


    handleDataChange = (evt) => {
        console.log(evt);
        this.setState
            (
                {
                    data: JSON.parse(evt.json)
                }
            );
        console.log(this.state.data);
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
                        </div>
                        <div className='subsEditor'>
                            <Editor
                            className='seditor'
                                value={this.state.data}
                                textareaId = "codeArea"
                                onValueChange={(code) => this.setState({data : code})}
                                highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
                                padding={10}
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
                        <div className='resTitleBar'>
                            Hearings
                            <div className='subsInp'>
                                <input type="text" placeholder='Add Subscriptions here' />
                                <button>+</button>
                            </div>
                        </div>

                        <div className='subsList'>
                            <div className='subsItem'>
                                My name is Henit
                                <button >
                                    x
                                </button>
                            </div>
                        </div>

                        <div className='resultEditor'>
                            <JSONInput
                                id='a_unique_id'
                                placeholder={testData}
                                locale={locale}
                                height="100%"
                                width="100%"
                            // margin="0.5%"
                            />
                        </div>
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