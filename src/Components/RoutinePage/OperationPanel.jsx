import React from "react";
import '../../Styles/RoutinePage/OperationsPanel.css'
import StatisticsPanel from "./OperationPanel/StatisticsPanel";
import ObservationPanel from "./OperationPanel/ObservationPanel";

const OperationsPanel = () => {

    return (
        <div className="panel">
            <div className="statisticsPanel">
                <StatisticsPanel/>
            </div>
            <div className="observationsPanel">
                <ObservationPanel/>
            </div>
        </div>
    )

}

export default OperationsPanel;