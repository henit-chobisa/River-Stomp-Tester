
import RouteItem from './routeItem';
import { useRef } from 'react';


import {useState, useEffect} from "react"
import { useStompClient } from 'react-stomp-hooks';
import EditorComp from './EditorComp';
import HoverTitleComp from './HoverTitleComp';

const RouteTab = (props) => {

    var defaultBody = "{\n\t\"message\" : \"Insert your body here\"\n}";
    var defaultHeader = "{\n\t\"message\" : \"Insert your header here\"\n}"
    const [currentRoute, updateCurrentRoute] = useState("No Route Selected");
    const [routeValue, updateRouteValue] = useState("");
    const [routes, updateRoutes] = useState([]);
    const [routeAdded, updateRouteAdded] = useState(false);
    const [routeSelected, updateRouteSelected] = useState(false);
    const [data, updateData] = useState(defaultBody);
    const [header, updateHeader] = useState(defaultHeader);
    const sendButton = useRef();
    const routeList = useRef();
    const client = useStompClient();

    
    useEffect(() => {
        if (routes.length === 0) {
            updateRouteSelected(false);
        }
    }, [routes])

    useEffect(() => {
        if (routes.length > 2) {
            if (routeAdded === true) {
                routeList.current.getElementsByClassName("routeItem")[routes.length - 1].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                updateRouteAdded(false);
            }
        }
    }, [routes, routeAdded]);

    const addRoute = () => {
        var clone = [...routes];
        clone.push({ value: routeValue, index: clone.length, body: defaultBody, header: defaultHeader, isActive: false });
        updateRoutes(clone);
        updateRouteValue("");
        updateRouteAdded(true);
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
                updateRouteSelected(false);
                updateData(defaultBody)
                updateHeader(defaultHeader)
                updateCurrentRoute("No Route Selected");
            }
        }
        else {
            updateRouteSelected(false);
        }
        updateRoutes(clone);
    }

    const handleSendEvent = () => {
        if (routes.length === 0 || routeSelected === false){
            props.updateError("No routes available or selected");
        }
        else{
            sendButton.current.className = "buttonAnim";
            client?.publish({
                destination: currentRoute,
                header: JSON.stringify(JSON.parse(header)),
                body: JSON.stringify(JSON.parse(data))
            })
            setTimeout(() => {
                sendButton.current.className = "routeTrigger"
            }, 2000)
        }
    }

    const handleRouteItemSelection = (index, target) => {

        if (target.tagName === "DIV") {
            updateRouteSelected(true);
            var clone = [...routes];
            clone.map((route) => {
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

    const renderRoutes = () => {
        if (routes.length === 0) {
            return (<p className='warning'> No Routes added yet, add one. </p>)
        }
        else {
            return routes.map((route) => (<RouteItem route={route.value} index={route.index} isActive={route.isActive} handleRoutePop={handleRoutePop} handleSelection={handleRouteItemSelection} />));
        }
    }

    return (
        <div className='subscriptionBar'>
                    <div className='subsTitleBar'>
                        {currentRoute}
                        <div className="routeManager">
                            <input type="text" name="" id="" value={routeValue} onChange={(evt) => updateRouteValue(evt.target.value)} placeholder='Add a route here' />
                            <button onClick={addRoute}>
                                +
                            </button>
                        </div>
                    </div>
                    <div className="routeBox">
                        <button className='routeTrigger' onClick={handleSendEvent} ref={sendButton}>
                            Send
                        </button>
                        <div className="routeList" ref={routeList}>
                            {renderRoutes()}
                        </div>
                    </div>
                    {routeSelected === true ? <EditorComp data={data} updateData={updateData}/> : <div className='routeNullWarning'>No routes available or selected, add one above.</div>}
                    <HoverTitleComp routeSelected={routeSelected} title={"Headers"}/>
                    {routeSelected === true ? <EditorComp data={header} updateData={updateHeader}/> : <></>}
                    <HoverTitleComp routeSelected={routeSelected} title={"Headers"}/>
                </div>
    )
}

export default RouteTab;