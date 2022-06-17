import React, { useEffect, useRef, useState } from "react";
import '../../../Styles/RoutinePage/OperationPanel/StatisticsPanel.css'
import OptionButton from "./OptionButton";
import '../../../../node_modules/react-vis/dist/style.css';
import { FlexibleXYPlot, VerticalBarSeries, LabelSeries, XAxis, YAxis, LineSeries } from 'react-vis';
import testRoutineData from "../../../Assets/testRoutineData";

const StatisticsPanel = (props) => {
    const graphViewRef = useRef();

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (selectedIndex === 1){
                handleOptionClickCallback(1);
            }
        })
    });

    const executionTimePublish = testRoutineData.routine.filter((data) => {
        if (data.operation === "PUBLISH"){
            return data;
        }
    }).map((data) => {
        return {x : data.title, y : data.executionTime}
    }) ;

    const executionTimeSubscribe = testRoutineData.routine.filter((data) => {
        if (data.operation !== "PUBLISH"){
            return data;
        }
    }).map((data) => {
        return {x : data.title, y : data.executionTime}
    });

    const [execView, updateExecView] = useState(true);

    const dataByteDataPublish = testRoutineData.routine.filter((dat) => {
        if (dat.operation === "PUBLISH"){
            return dat;
        }
    }).map((dat) => {
        return {
            x: dat.title,
            y: dat.dataBytes
        }
    })

    const dataByteDataSubscribe = testRoutineData.routine.filter((dat) => {
        if (dat.operation !== "PUBLISH"){
            return dat;
        }
    }).map((dat) => {
        return {
            x: dat.title,
            y: dat.dataBytes
        }
    })

    const [selectedIndex, updateSelectedIndex] = useState(null);

    const [Options, UpdateOptions] = useState([{ key: 0, title: "Routine Map", isSelected: false }, { key: 1, title: "Graph", isSelected: false }, { key: 2, title: "Create Routine", isSelected: false }]);


    const handleOptionClickCallback = (index) => {
        console.log(executionTimePublish);
        const clone = [...Options];
        if (selectedIndex !== null) {
            clone[selectedIndex].isSelected = false;
        }
        updateSelectedIndex(index);
        clone[index].isSelected = true;
        UpdateOptions(clone);
    }

    const renderOptions = () => {
        return Options.map((option) => (<OptionButton onClickOption={handleOptionClickCallback} index={option.key} isSelected={option.isSelected} title={option.title} />));
    }

    const handleGraphViewOption = (index) => {
       
        if (index === 0) {
            updateExecView(false);
        }
        else {
            updateExecView(true);
        }
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
                    <div className="graphView">
                        <div className="graph">
                            <FlexibleXYPlot className="plot" xType="ordinal" height={graphViewRef.current.offsetHeight * 0.7} width = {graphViewRef.current.offsetWidth * 0.75}>
                                <XAxis/>
                                <YAxis/>
                                { execView === false ? <VerticalBarSeries data={dataByteDataPublish} barWidth={0.4} opacity={1} color={"rgb(245, 61, 61)"} /> : <></> } 
                                { execView === false ? <VerticalBarSeries data={dataByteDataSubscribe} barWidth={0.4} opacity={1} color={"rgb(0, 160, 198)"} /> : <></> } 
                                {execView === true ? <LineSeries data={executionTimePublish} color={"rgb(245, 61, 61)"}/> : <></>}
                                {execView === true ? <LineSeries data={executionTimeSubscribe} color={"rgb(0, 160, 198)"} /> : <></>}
                            </FlexibleXYPlot>
                        </div>
                        <div className="options">
                            <OptionButton onClickOption={handleGraphViewOption} index={0} isSelected={!execView} title={"Data Exchange"} />
                            <OptionButton onClickOption={handleGraphViewOption} index={1} isSelected={execView} title={"Execution Time"} />
                        </div>
                    </div>

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