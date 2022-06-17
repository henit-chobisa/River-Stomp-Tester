import React from "react";
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

    return (
        <div className="statsPanelDiv">
            <div className="featureBar">
                <OptionButton isSelected={false} title={"Routine Map"} />
                <OptionButton isSelected={true} title={"Graph"} />
                <OptionButton isSelected={false} title={"Create Routine"} />
            </div>
            <div className="divider">

            </div>
            <div className="presentationBar">
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