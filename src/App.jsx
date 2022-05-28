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
import bell from "./bell.wav";
import RouteItem from './routeItem';
import { useRef } from 'react';
import { useEffect } from 'react';

const hightlightWithLineNumbers = (input, language) =>{
    return highlight(input, language).split("\n").map((line, i) => `<span class='editorLineNumber'>${i + 1}\t</span>${line}`).join("\n")};



const App = (props) => {
    var audio = new Audio(bell);
    var defaultBody = "{\n\t\"message\" : \"Insert your body here\"\n}";
    var defaultHeader = "{\n\t\"message\" : \"Insert your header here\"\n}"
    const [connectionURL, updateConnectionURL] = useState(props.conURL);
    const [data, updateData] = useState(defaultBody);
    const [header, updateHeader] = useState(defaultHeader);
    const [routeValue, updateRouteValue] = useState("");
    const [routes, updateRoutes] = useState([]);
    const [resultData, updateResultData] = useState(testData);
    // const [sendRoute, updateSendRoute] = useState("");
    const [subscriptions, updateSubscriptions] = useState([]);
    const [subsText, updateSubsText] = useState("");
    const [currentSubscription, updateCurrentSubscription] = useState("Current Route")
    const [currentRoute, updateCurrentRoute] = useState("No Route Selected");
    const [currentCounter, updateCurrentCounter] = useState(0);
    const isConnected = props.isConnected;
    const client = props.getClient();
    const subscriptionList = useRef();


    const handleSendEvent = () => {
        client?.publish({
            destination: currentRoute,
            header: JSON.stringify(JSON.parse(header)),
            body: JSON.stringify(JSON.parse(data))
        })
    }
    const updateInputValue = (evt) => {
        updateConnectionURL(evt.target.value);
    }

    const connectToStomp = () => {
        props.handleURL(connectionURL);
    }

    const handleSubsInput = (evt) => {
        updateSubsText(evt.target.value);
    }

    const handleSubscriptionAdd = () => {
        if (subsText.length !== 0) {
            var present = false;
            var clone = subscriptions.slice(0);
            clone.map((obj) => {
                if (obj.route === subsText) {
                    present = true;
                }
                return obj;
            })
            if (present === false) {
                clone.push({ route: subsText, key: Math.random(100), data: {}, isActive: false, counter: 0 });
                updateSubscriptions(clone);
                updateSubsText("");
            }
            
        }
    }

    const scrollIndexSubscriptions = (index) => {
        if (index > 2) {
            subscriptionList.current.getElementsByClassName("subsItem")[index].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
        }
    }


    const handleDataUpdate = (data) => {
        updateData(data);
    }

    useEffect(() => {
        if (subscriptions.length > 3){
            scrollIndexSubscriptions(subscriptions.length - 1)
        }

    }, [subscriptions])


    function handleSubsPop(index) {
        var clone = subscriptions.splice(0);
        var wasActive = clone[index].isActive;
        client.unsubscribe(clone[index].route);
        clone.splice(index, 1);
        if (wasActive === true) {
            if (clone.length > 0) {
                if (index === 0) {
                    clone[index].isActive = true;
                    updateCurrentCounter(clone[index].counter);
                    updateCurrentSubscription(clone[index].route);
                    updateResultData(clone[index].data);
                }
                else {
                    clone[index - 1].isActive = true;
                    updateCurrentCounter(clone[index - 1].counter);
                    updateCurrentSubscription(clone[index - 1].route);
                    updateResultData(clone[index - 1].data);
                }
            }
            else {
                updateResultData(testData);
                updateCurrentSubscription("Current Route")
            }
        }
        updateSubscriptions(clone);
    }

    const handleSubsClick = (index, target) => {
        if (target.tagName === "DIV") {
            var clone = [...subscriptions];
            clone.map((sub) =>
                sub.isActive = false
            )
            clone[index].isActive = true;
            updateCurrentCounter(clone[index].counter);
            updateCurrentSubscription(clone[index].route);
            updateResultData(clone[index].data);
            updateSubscriptions(clone);
        }
    }

    const loadSubscriptions = () => {
        if (subscriptions.length !== 0) {
            return subscriptions.map((subscription, index) =>
                <SubsItem route={subscription.route} index={index} handleListPop={handleSubsPop} handleSubsMessage={handleSubscriptionMessage} handleSubsClick={handleSubsClick} isActive={subscription.isActive} isSubscribed={true} />
            )
        }
        else {
            return (<p className='warning'> No Subscriptions added yet</p>)
        }
    }

    const handleSubscriptionMessage = (message, index) => {
        var dup = [...subscriptions];
        var data = JSON.parse(message);
        if (JSON.stringify(dup[index].data) === JSON.stringify(data)) {
            dup[index].counter = dup[index].counter + 1;
        }
        else {
            dup[index].data = data;
        }
        updateSubscriptions(dup);
        handleSubsClick(index, { tagName: "DIV" });
        scrollIndexSubscriptions(index);
        audio.play();
    }

    const handleRouteValueChange = (evt) => {
        updateRouteValue(evt.target.value);
    }

    const addRoute = () => {
        var clone = [...routes];
        clone.push({value : routeValue, index : clone.length, body: defaultBody, header: defaultHeader, isActive: false});
        updateRoutes(clone);
        updateRouteValue("");
    }

    const renderRoutes = () => {
        if (routes.length === 0){
            return (<p className='warning'> No Routes added yet, add one. </p>)
        }
        else {
            return routes.map((route) => (<RouteItem route={route.value} index={route.index}  isActive={route.isActive} handleRoutePop={handleRoutePop} handleSelection={handleRouteItemSelection}/>));
        }
    }

    const handleRoutePop = (index) => {
        var clone = [...routes];
        var wasActive = clone[index].isActive;
        clone.splice(index, 1);
        if (wasActive === true) {
            if (clone.length > 0) {
                if (index === 0) {
                    clone[index].isActive = true;
                    updateData(clone[index].body);
                    updateHeader(clone[index].header);
                    updateCurrentRoute(clone[index].value)
                }
                else {
                    clone[index - 1].isActive = true;
                    updateData(clone[index - 1].body);
                    updateHeader(clone[index - 1].header);
                    updateCurrentRoute(clone[index - 1].value);
                }
            }
            else {
                updateData(defaultBody)
                updateHeader(defaultHeader)
                updateCurrentRoute("No Route Selected");
            }
        }
        updateRoutes(clone);
    }

    const handleRouteItemSelection = (index, target) => {
        if (target.tagName === "DIV"){
            var clone = [...routes];
            clone.map((route) =>
                {
                    if (route.isActive) {
                        route.body = data;
                        route.header = header;
                        route.isActive = false;
                    }
                    return route;
                }
            )
            clone[index].isActive = true;
            updateData(clone[index].body);
            updateHeader(clone[index].header);
            updateCurrentRoute(clone[index].value);
            updateRoutes(clone);
        }
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
                    <button className='connectionButton' onClick={connectToStomp} id='cB'>{(isConnected === false) ? "Connect" : "Connected"}</button>
                </div>
                <h3 className="title" style={{ color: "White" }}>R i v e r</h3>
            </div>

            <div className='bottomBar'>
                <div className='subscriptionBar'>
                    <div className='subsTitleBar'>
                        {currentRoute}
                        <div className="routeManager">
                            <input type="text" name="" id="" value={routeValue} onChange={handleRouteValueChange} placeholder='Add a route here' />
                            <button onClick={addRoute}>
                                +
                            </button>
                        </div>
                    </div>
                    <div className="routeBox">
                        <button className='routeTrigger' onClick={handleSendEvent}>
                            Send
                        </button>
                        <div className="routeList">
                            {renderRoutes()}
                        </div>
                    </div>
                    <div className='subsEditor'>
                        <Editor
                            className='seditor'
                            value={data}
                            textareaId="codeArea"
                            onValueChange={(code) => handleDataUpdate(code)}
                            highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
                            padding="30px"
                        />
                    </div>
                    <div className="titleContainer">
                        Send Message
                    </div>
                    <div className='subsEditor'>
                        <Editor
                            className='seditor'
                            value={header}
                            textareaId="codeArea"
                            onValueChange={(code) => updateHeader(code)}
                            highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
                            padding="30px"
                        />
                    </div>
                    <div className="titleContainer">
                        Header
                    </div>
                </div>
                <div className='resultBar'>
                    <div className='resTitleBar'>
                        Hearings
                        <div className='subsInp'>
                            <input type="text" placeholder='Add Subscriptions here' value={subsText} onChange={handleSubsInput} />
                            <button style={{ color: "white" }} onClick={handleSubscriptionAdd}>+</button>
                        </div>
                    </div>
                    <div className='subsList' ref={subscriptionList}>
                        {loadSubscriptions()}
                    </div>

                    <div className='resultEditor'>
                        <JSONInput
                            id='a_unique_id'
                            placeholder={{ resultData }}
                            locale={locale}
                            height="100%"
                            width="100%"
                            viewOnly={true}
                        />
                    </div>
                    <div className="resultName">
                        <p>
                            {currentSubscription}
                        </p>
                        {currentCounter !== 0 ? <div className='resultCounter'>
                            {currentCounter}
                        </div> : <></>}
                    </div>
                </div>
            </div>
            {/* <div className='bottomTitle'>
                <p>v1.0.0 Designed and Developed By Henit Chobisa</p>
            </div> */}
            {/* <div className='errorBox'>
                You have this error kindly do this
            </div> */}
        </div>
    );
}

export default App;