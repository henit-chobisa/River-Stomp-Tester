import React from "react";
import '../../../Styles/RoutineDisplay/Components/OptionWrapper.css'
import CreateSubRoutine from "./CreateSubRoutine";
import RoutineMap from "./RoutineMap";
import RoutineStatistics from "./RoutineStatistics";

const OptionWrapper = (props) => {

    const getTitle = () => {
        switch (props.selection) {
            case 0:
                return "Routine Map";
            case 1:
                return "Statistics";
            case 2:
                return "Observations";
            case 3:
                return "Create Subroutine";
            default:
                break;
        }
    }

    const getView = () => {
        switch (props.selection){
            case 0:
                return (<RoutineMap data={props.data}/>)
            case 1:
                // feat: Initialized Routine Statistics Utility
                return (<RoutineStatistics data={props.data}/>)
            case 3:
                // feat: Initialized Create SubRoutine Menu
                return (<CreateSubRoutine data={props.data}/>)
            default:
                return (<></>);
        }
    }

    return (
        <div className="OptionWrapper">
            <div className="title">
                <p>{getTitle()}</p>
            </div>
            <div className="view">
                {getView()}
            </div>
        </div>
    )
}

export default OptionWrapper;