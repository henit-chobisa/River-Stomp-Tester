import React from "react"
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const MapViewComp = (props) => {

    const fetchColor = () => {
        if (props.routineComp.operation === "PUBLISH"){
            return "secondary"
        } 
        else{
            return "primary"
        }
    }

    const handleClick = () => {
        props.handleMapCompClick(props.index);
    }


    return (
        <TimelineItem style={{ cursor: "pointer" }} onClick={handleClick}>
            <TimelineSeparator>
                <TimelineDot variant="outlined" color={fetchColor()} />
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent className="tContent" color={"white"}>{props.routineComp.title}</TimelineContent>
        </TimelineItem>
    );

}

export default MapViewComp;