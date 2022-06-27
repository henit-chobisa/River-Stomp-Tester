import React from "react"
import Timeline from '@mui/lab/Timeline';

import theme from "../../Generic/Theme";
import { ThemeProvider } from "@mui/system";
import MapViewComp from "./MapViewComp/MapViewComp";
import { useState } from "react";

const MapView = (props) => {

    const mapCompClicked = (index) => {
        updateSelectedIndex(index);
    }

    const [selectedIndex, updateSelectedIndex] = useState(null);
    
    const renderTimeLineItems = () => {
        return props.routineData.subRoutines.map((data, index) => {
            return (<MapViewComp routineComp={data} key={index} handleMapCompClick={mapCompClicked} index={index}/>)
        })
    };

    const fetchUtilitiesStyle = () => {
        if (selectedIndex === null){
            return {backgroundColor : "transparent"}
        }
        else if (props.routineData.subRoutines[selectedIndex].operation === "PUBLISH"){
            return {backgroundColor : "rgb(245, 61, 61)"}
        }
        else {
            return {backgroundColor : "rgb(0, 160, 198)"}
        }
    }

    const fetchUtilityInfo = () => {
        if (selectedIndex === null){
            return (
                <div className="noSelectionWarning">
                    <p>Select a routine component for info : ) </p>
                </div>
            )
        }
        else {
            var routineComponent = props.routineData.subRoutines[selectedIndex];
            
            return (
                <div className="compUtilityInfo">
                    <div className="title">
                        <p>{routineComponent.title}</p>
                    </div>
                    <div className="description">
                        <p>{routineComponent.description}</p>
                    </div>
                    <div className="attributes">
                        <div className="type">
                            <p id="key">Type : </p>
                            <p id="value">{routineComponent.operation}</p>
                        </div>
                        <div className="executionTime">
                            <p id="key">Execution Time : </p>
                            <p id="value">{routineComponent.executionTime}ms</p>
                        </div>
                        <div className="data">
                            <p id ="key">Data Interchange</p>
                            <p id="value">{routineComponent.dataBytes} B</p>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="mapView">
            <div className="routineTree">
                <ThemeProvider theme={theme}>
                    <Timeline position="alternate" className="timelineMap">
                        {renderTimeLineItems()}
                    </Timeline>
                </ThemeProvider>
            </div>
            <div className="utilities" style={fetchUtilitiesStyle()}>
                {fetchUtilityInfo()}
            </div>
        </div>
    )

}

export default MapView