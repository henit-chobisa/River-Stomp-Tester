import React from "react"
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import theme from "../../Generic/Theme";
import { ThemeProvider } from "@mui/system";

const MapView = (props) => {

    const renderTimeLineItems = () => {
        return props.routineData.routine.map((data) => {
            if (data.operation === "PUBLISH") {
                return (
                    <TimelineItem style={{ cursor: "pointer" }}>
                        <TimelineSeparator>
                            <TimelineDot variant="outlined" color="primary" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent className="tContent" color={"white"}>{data.title}</TimelineContent>
                    </TimelineItem>
                )
            }
            else {
                return (
                    <TimelineItem style={{ cursor: "pointer" }}>
                        <TimelineSeparator>
                            <TimelineDot variant="outlined" color="secondary" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent className="tContent" color={"white"}>{data.title}</TimelineContent>
                    </TimelineItem>
                )
            }
        })
    };

    return (
        <div className="mapView">
            <div className="routineTree">
                <ThemeProvider theme={theme}>
                    <Timeline position="alternate" className="timelineMap">
                        {renderTimeLineItems()}
                    </Timeline>
                </ThemeProvider>
            </div>
            <div className="utilities">

            </div>
        </div>
    )

}

export default MapView