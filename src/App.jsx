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
import SubsItem from './SubsItem';
import { useState } from 'react';

const hightlightWithLineNumbers = (input, language) =>
  highlight(input, language)
    .split("\n")
    .map((line, i) => `<span class='editorLineNumber'>${i + 1}\t</span>${line}`)
    .join("\n");



const App = (props) => {

    const [connectionURL, updateConnectionURL] = useState("");
    const [connectionStatus, updateConnectionStatus] = useState("");
    const [data, updateData] = useState(" // Insert your message here");
    const [resultData, updateResultData] = useState(testData);
    const [sendRoute, updateSendRoute] = useState("");
    const [subscriptions, updateSubscriptions] = useState([]);
    const [subsText, updateSubsText] = useState("");
    const client = props.getClient();

    const updateSendRouteValue = (evt) => {
        updateSendRoute(evt.target.value)
    }
    const handleSendEvent = () => {
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

    const handleSubsInput = (evt) => {
        updateSubsText(evt.target.value);
    }

    // useSubscription("/channel/627aa61f7a1ae23ba96350ac/notify", (message) => {
    //     console.log(message.body);
    // })

    // client.subscribe("/channel/627aa61f7a1ae23ba96350ac/notify", (messsage) => {
    //     console.log(messsage.body);
    // })

    const handleSubscriptionAdd = () => {
        console.log(subscriptions);
        if (subsText.length !== 0) {
            var present = false;
            var clone = subscriptions.slice(0);
            clone.map((obj) => {
                if (obj.route === subsText){
                    present = true;
                }
                return obj;
            })
            if (present === false){
                clone.push({route : subsText, key : Math.random(100)});
                client.subscribe(subsText, (message) => {
                    console.log(message.body);
                    console.log(JSON.stringify(JSON.parse(message.body)));
                    updateResultData(JSON.parse(message.body));
                })
                updateSubscriptions(clone);
            }
            updateSubsText("");
        }
    }

    function handleSubsPop(index){
        var clone = subscriptions.splice(0);
        clone.splice(index, 1);
        updateSubscriptions(clone);
    }

    const loadSubscriptions = () => {
        if(subscriptions.length !== 0){
            return subscriptions.map((subscription, index) => 
                <SubsItem route={subscription.route} index={index} handleListPop={handleSubsPop} handleSubsMessage={handleSubscriptionMessage}/>
            )
        }
        else {
            return (<p className='warning'> No Subscriptions added yet</p>)
        }
    }

    const handleSubscriptionMessage = (index, message) => {
        console.log(message);
        updateResultData(JSON.stringify(JSON.parse(message)));
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
                        <button className='connectionButton' onClick={connectToStomp} id='cB'>{(connectionStatus === "DISCONNECTED") ? "Connect" : "Connected"}</button>
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
                                <input type="text" placeholder='Add Subscriptions here' value={subsText} onChange={handleSubsInput}/>
                                <button style={{color : "white"}} onClick={handleSubscriptionAdd}>+</button>
                            </div>
                        </div>
                        <div className='subsList'>
                            {loadSubscriptions()}
                        </div>

                        <div className='resultEditor'>
                            <JSONInput
                                id='a_unique_id'
                                placeholder={{resultData}}
                                locale={locale}
                                height="100%"
                                width="100%"
                                viewOnly={true}
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