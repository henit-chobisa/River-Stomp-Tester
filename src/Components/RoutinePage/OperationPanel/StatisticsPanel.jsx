import React from "react";
import '../../../Styles/RoutinePage/OperationPanel/StatisticsPanel.css'
import OptionButton from "./OptionButton";

const StatisticsPanel = (props) => {
    return (
        <div className="statsPanelDiv">
            <div className="featureBar">
                <OptionButton title={"Presentation"}/>
            </div>
            <div className="presentationBar">

            </div>
        </div>
    )
}

export default StatisticsPanel;