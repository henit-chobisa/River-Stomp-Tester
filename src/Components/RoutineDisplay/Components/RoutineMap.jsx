import React, { useState } from "react";
import '../../../Styles/RoutineDisplay/Components/RoutineMap.css'
import theme from "../../Generic/Theme";
import { ThemeProvider } from "@mui/system";
import { Timeline } from "@mui/lab";
import testRoutineData from "../../../Assets/testRoutineData";
import MapViewComp from "../../RoutinePage/OperationPanel/MapViewComp/MapViewComp";
import StatisticTitle from "../../Generic/StatisticTitle";

const RoutineMap = (props) => {

    const [selectedMapIndex, updateSelectedMapIndex] = useState(null);

    const mapCompClicked = (index) => {
        updateSelectedMapIndex(index);
    }

    const loadMapStats = () => {
        if (selectedMapIndex != null){
            return (
                <div className="stats">
                    <StatisticTitle heading={"Data Exchange"} num={testRoutineData.routines[selectedMapIndex].dataBytes} unit={"b"}/>
                    <StatisticTitle heading={"Execution Time"} num={testRoutineData.routines[selectedMapIndex].executionTime} unit={"ms"}/>
                </div>
            )
        }
        else {
            return (
                <div className="noSelectionWarning">
                    <p>Statistics</p>
                </div>
            )
        }
        
    }

    const renderTimeLineItems = () => {
        return testRoutineData.routines.map((data, index) => {
            return (<MapViewComp routineComp={data} key={index} handleMapCompClick={mapCompClicked} index={index} />)
        })
    };

    return (
        <div className="RoutineMap">
            <div className="mapView">
                <div className="map">
                    <ThemeProvider theme={theme}>
                        <Timeline position="alternate" className="timelineMap">
                            {renderTimeLineItems()}
                        </Timeline>
                    </ThemeProvider>
                </div>
                {loadMapStats()}
            </div>
            { selectedMapIndex !== null ? <div className="info">
                <div className="subRTitle">
                    <div className="p">{testRoutineData.routines[selectedMapIndex].title}</div>
                </div>
                <div className="subRDescription">
                    <p>{testRoutineData.routines[selectedMapIndex].description}</p>
                </div>
                <div className="highlights">
                    <div className="route">
                        <p>{testRoutineData.routines[selectedMapIndex].route}</p>
                    </div>
                    <div className="type">
                        <p>{testRoutineData.routines[selectedMapIndex].operation}</p>
                    </div>
                </div>
            </div> : <div className="noSelectionWarningInfo">
                    <p>Select a routine to disply info.</p>
                </div>}
        </div>
    )

}

export default RoutineMap;