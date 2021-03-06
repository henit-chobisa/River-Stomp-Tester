import React from "react";
import '../../Styles/RoutinePage/OperationsPanel.css'
import StatisticsPanel from "./OperationPanel/StatisticsPanel";
import ObservationPanel from "./OperationPanel/ObservationPanel";

const OperationsPanel = (props) => {

    return (
        <div className="panel">
            <div className="statisticsPanel">
                <div className="statBottomTitle">
                    <div className="content">
                        <p>Statistics</p>
                    </div>
                </div>
                <StatisticsPanel addRoutine={props.addRoutine} selectedRoutine={props.selectedRoutine}/>
            </div>
            <div className="observationsPanel">
                <div className="obsvBottomTitle">
                    <div className="content">
                        <p>Observations</p>
                    </div>
                </div>
                <ObservationPanel present={true} selectedRoutine={props.selectedRoutine}/>
            </div>
        </div>
    )
}


export default OperationsPanel;