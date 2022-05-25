import React from 'react';
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
    useStompClient,
    useSubscription,
} from "react-stomp-hooks";
import { useState } from 'react';
import { useEffect } from 'react';


const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}\t</span>${line}`)
    .join("\n");



const App = (props) => {

    const [connectionURL, updateConnectionURL] = useState("");
    const [connectionStatus, updateConnectionStatus] = useState("");
    const [data, updateData] = useState("\t // Input your JSON here");
    // const client = useStompClient();
    const [sendRoute, updateSendRoute] = useState("")
    const client = props.getClient();

    const updateSendRouteValue = (evt) => {
        updateSendRoute(evt.target.value)
    }
    const handleSendEvent = () => {
        console.log(client);
        client?.publish({
            destination : sendRoute,
            body : JSON.stringify(JSON.parse(data))
        })
    }
    const updateInputValue = (evt) => {
        updateConnectionURL(evt.target.value);
    }

    const connectToStomp = () => {
        console.log(props);
        props.handleURL(connectionURL);
        updateConnectionStatus("CONNECTED")
    }

    useEffect(() => {
       
    }, [connectionURL, "CONNECTED"])

    const handleConnectionError = () => {
        updateConnectionStatus("DISCONNECTED");
    }

        return (
            <div className='App'>
                <div className='upperBar'>
                    <img className="logo" src={logo} alt="" />
                    <div className='cd'>
                        <input className='urlFeild' type="url"
                            placeholder="Enter a Url to an stomp endpoint"
                            onChange={updateInputValue}
                        />
                        <button className='connectionButton' onClick={connectToStomp} id='cB' style={{ color: "green" }}>{(connectionStatus === "DISCONNECTED") ? "Connect" : "Connected"}</button>
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
                                value={data}
                                textareaId = "codeArea"
                                onValueChange={(code) => updateData(code)}
                                highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
                                padding = "30px"
                            />
                        </div>

                        <div className='senderBar'>
                            <input className='channelInputBar' type="text" name="" id="" placeholder='Enter the channel to send' onChange={updateSendRouteValue} />
                            <button onClick={handleSendEvent} className='channelSendButton'>
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

export default App;