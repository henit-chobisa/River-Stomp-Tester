import React, { useEffect, useRef, useState } from "react";
import '../../../Styles/RoutinePage/OperationPanel/StatisticsPanel.css'
import OptionButton from "./OptionButton";
import '../../../../node_modules/react-vis/dist/style.css';

import testRoutineData from "../../../Assets/testRoutineData";
import GraphView from "./GraphView";

import MapView from "./MapView";
import CreateView from "./CreateView";

const StatisticsPanel = (props) => {
    const graphViewRef = useRef();
    var innerHeight = 0;
    var innerWidth = 0;

    useEffect(() => {
        window.addEventListener("resize", (event) => {
            // if (event.target.innerHeight !== innerHeight || event.target.innerWidth !== innerWidth){
            //     if (selectedIndex === 1) {
            //         handleOptionClickCallback(1);
            //         console.log("Hello");
            //         innerHeight = event.target.innerHeight;
            //         innerWidth = event.target.innerWidth;
            //     }
            // }
        })
    });

    const [selectedIndex, updateSelectedIndex] = useState(null);

    const [Options, UpdateOptions] = useState([{ key: 0, title: "Routine Map", isSelected: false }, { key: 1, title: "Graph", isSelected: false }, { key: 2, title: "Create Routine", isSelected: false }]);


    const handleOptionClickCallback = (index) => {
        const clone = [...Options];
        if (selectedIndex !== null) {
            clone[selectedIndex].isSelected = false;
        }
        updateSelectedIndex(index);
        clone[index].isSelected = true;
        UpdateOptions(clone);
    }


    const renderOptions = () => {
        return Options.map((option, index) => (<OptionButton key={index} onClickOption={handleOptionClickCallback} index={option.key} isSelected={option.isSelected} title={option.title} />));
    }

    const renderPresentationComponent = () => {
        if (selectedIndex === null) {
            return <div className="warningView">
                <p className="noSelectionWarning">No Option Selected to Show, kindly select one :)</p>
            </div>

        }
        else {
            if (selectedIndex === 1) {
                return (
                    <GraphView routineData={testRoutineData} graphViewRef={graphViewRef} />
                )
            }
            else if (selectedIndex === 0) {
                return (
                   <MapView routineData={testRoutineData}/>
                )
            }
            else {
                return (
                    <CreateView addRoutine={props.addRoutine}/>
                )
            }
        }
    }

    return (
        <div className="statsPanelDiv">
            <div className="featureBar">
                {renderOptions()}
            </div>
            <div className="divider"></div>
            <div className="presentationBar" ref={graphViewRef}>
                {selectedIndex !== null ? <div className="title">
                    <p>{Options[selectedIndex].title}</p>
                </div> : <></>}
                {renderPresentationComponent()}
            </div>
        </div>
    )
}

export default StatisticsPanel;