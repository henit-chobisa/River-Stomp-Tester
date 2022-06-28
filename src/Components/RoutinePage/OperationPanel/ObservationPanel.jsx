import React from "react";
import '../../../Styles/RoutinePage/OperationPanel/ObservationPanel.css'

const ObservationPanel = (props) => {


    const getExecutionTime = () => {
        if (props.selectedRoutine.subRoutines === undefined){
            return "0";
        }
        else {
            var sum = 0;
            props.selectedRoutine.subRoutines.map((routine) => {
                console.log(routine);
                sum += routine.executionTime;
                return routine;
            });

            return sum;
        }
    }

    const getDataExchange = () => {
        if (props.selectedRoutine.subRoutines === undefined){
            return "0";
        }
        else {
            var sum = 0;
            props.selectedRoutine.subRoutines.map((routine) => {
                sum += routine.dataBytes;
                return routine;
            })
            return sum;
        }
    }

    return (
        <div className="observPanelDiv">
            {props.selectedRoutine !== null ? <div className="observationPanelPresent">
                <div className="heading">
                    <div className="routineType">
                        <p>{props.selectedRoutine.lastUpdated}</p>
                    </div>
                    <p>{props.selectedRoutine.title}</p>

                </div>
                <div className="descriptionDiv">
                    <p>{props.selectedRoutine.description}
                    </p>
                </div>

                <div className="authorDiv">
                    <p>{props.selectedRoutine.author}</p>
                </div>
                <div className="statsView">
                    <div className="dataBlock">
                        <p>Data Exchange</p>
                        <div className="divider"></div>
                        <div className="data">
                            <div className="num">
                                <p>{getDataExchange()}</p>
                            </div>
                            <div className="unit">
                                <p>B</p>
                            </div>
                        </div>
                    </div>
                    <div className="dataBlockExec">
                        <p>Execution Time</p>
                        <div className="dividerExec"></div>
                        <div className="dataExec">
                            <div className="numExec">
                                <p>{getExecutionTime()}</p>
                            </div>
                            <div className="unitExec">
                                <p>ms</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                : <div className="observationPanelAbsent">
                    <p>Select a routine to show observations</p>
                </div>}
        </div>
    )
}

export default ObservationPanel;