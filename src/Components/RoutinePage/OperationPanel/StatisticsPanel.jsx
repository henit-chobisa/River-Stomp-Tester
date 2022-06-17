import React, { useState } from "react";
import '../../../Styles/RoutinePage/OperationPanel/StatisticsPanel.css'
import OptionButton from "./OptionButton";
import '../../../../node_modules/react-vis/dist/style.css';
import { FlexibleXYPlot, VerticalBarSeries, LabelSeries ,XAxis, YAxis } from 'react-vis';

const StatisticsPanel = (props) => {

    const data = [
        { x: 'A', y: 10, color:"rgb(0, 160, 198)" },
        { x: 'B', y: 5, color:"rgb(0, 160, 198)" },
        { x: 'C', y: 15, color:"rgb(0, 160, 198)" }
    ];

    const [selectedIndex, updateSelectedIndex] = useState(null);

    const [Options, UpdateOptions] = useState([{key:0,title : "Routine Map", isSelected : false}, {key:1, title : "Graph", isSelected: false}, {key:2, title: "Create Routine", isSelected: false}]);


    const handleOptionClickCallback = (index) => {
        const clone = [...Options];
        if (selectedIndex !== null){
            clone[selectedIndex].isSelected = false;
        }
        updateSelectedIndex(index);
        clone[index].isSelected = true;
        UpdateOptions(clone);
    }

    const renderOptions = () => {
        return Options.map((option) => (<OptionButton onClickOption={handleOptionClickCallback} index={option.key} isSelected={option.isSelected} title={option.title}/>));
    }

    const renderPresentationComponent = () => {
        if (selectedIndex === null){
            return  <p className="noSelectionWarning">No Option Selected to Show, kindly select one :)</p>
        }

    }

    return (
        <div className="statsPanelDiv">
            <div className="featureBar">
                {renderOptions()}
            </div>
            <div className="divider">

            </div>
            <div className="presentationBar">
                {renderPresentationComponent()}
                {/* <FlexibleXYPlot className="plot" height={230} width={700} xType = "ordinal">
                    <XAxis />
                    <YAxis />
                    <VerticalBarSeries data={data} barWidth={0.2} color={"rgb(0, 160, 198)"}/>
                </FlexibleXYPlot> */}
            </div>
        </div>
    )
}

export default StatisticsPanel;