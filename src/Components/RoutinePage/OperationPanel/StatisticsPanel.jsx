import React, { useEffect, useRef, useState } from "react";
import '../../../Styles/RoutinePage/OperationPanel/StatisticsPanel.css'
import OptionButton from "./OptionButton";
import '../../../../node_modules/react-vis/dist/style.css';
import GraphView from "./GraphView";
import MapView from "./MapView";
import CreateView from "./CreateView";

const StatisticsPanel = (props) => {
    const graphViewRef = useRef();
    // var innerHeight = 0;
    // var innerWidth = 0;

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
        if ((selectedIndex === null || props.selectedRoutine === null || props.selectedRoutine.subRoutines === undefined) && selectedIndex !== 2) {
            return <div className="warningView">
                <p className="noSelectionWarning">No Subroutines availabe to display :)</p>
            </div>
        }
        else {
            if (selectedIndex === 1) {
                return (
                    <GraphView routineData={props.selectedRoutine} graphViewRef={graphViewRef} />
                )
            }
            else if (selectedIndex === 0) {
                return (
                   <MapView routineData={props.selectedRoutine}/>
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
                </div> : <div className="title">
                    <p>No Selection</p>
                </div>}
                {renderPresentationComponent()}
            </div>
        </div>
    )
}

export default StatisticsPanel;