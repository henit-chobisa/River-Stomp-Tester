import React from "react";
import '../../Styles/RoutinePage/OperationsPanel.css'
import StatisticsPanel from "./OperationPanel/StatisticsPanel";
import ObservationPanel from "./OperationPanel/ObservationPanel";

const OperationsPanel = () => {

    return (
        <div className="panel">
            <div className="statisticsPanel">
                <StatisticsPanel/>
                <div className="statBottomTitle">
                    <div className="content">
                    <p>Statistics</p>
                    </div>
                </div>
            </div>
            <div className="observationsPanel">
                <ObservationPanel/>
                <div className="obsvBottomTitle">
                    <div className="content">
                        <p>Observations</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )

}

export default OperationsPanel;