import React, { useEffect, useRef, useState } from "react";
import '../../../Styles/RoutinePage/OperationPanel/StatisticsPanel.css'
import OptionButton from "./OptionButton";
import '../../../../node_modules/react-vis/dist/style.css';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import testRoutineData from "../../../Assets/testRoutineData";
import GraphView from "./GraphView";
import theme from "../../Generic/Theme";
import { ThemeProvider } from "@mui/system";

const StatisticsPanel = (props) => {
    const graphViewRef = useRef();

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (selectedIndex === 1) {
                handleOptionClickCallback(1);
            }
        })
    });

    const [selectedIndex, updateSelectedIndex] = useState(null);

    const [Options, UpdateOptions] = useState([{ key: 0, title: "Routine Map", isSelected: false }, { key: 1, title: "Graph", isSelected: false }, { key: 2, title: "Create Routine", isSelected: false }]);


    const handleOptionClickCallback = (index) => {
        const clone = [...Options];
        if (selectedIndex !== null) {
            clone[selectedIndex].isSelected = false;
        }
        updateSelectedIndex(index);
        clone[index].isSelected = true;
        UpdateOptions(clone);
    }

    const renderOptions = () => {
        return Options.map((option) => (<OptionButton onClickOption={handleOptionClickCallback} index={option.key} isSelected={option.isSelected} title={option.title} />));
    }

    const renderTimeLineItems = () => {
        return testRoutineData.routine.map((data) => {
            if (data.operation === "PUBLISH") {
                return (<TimelineItem>
                    <TimelineSeparator>
                        <TimelineDot variant="outlined" color="primary" />
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent className="tContent" color={"white"}>{data.title}</TimelineContent>
                </TimelineItem>)
            }
            else {
                return (
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot variant="outlined" color="secondary" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent className="tContent" color={"white"}>{data.title}</TimelineContent>
                    </TimelineItem>
                )
            }
    })};


    const renderPresentationComponent = () => {
        if (selectedIndex === null) {
            return <div className="warningView">
                <p className="noSelectionWarning">No Option Selected to Show, kindly select one :)</p>
            </div>

        }
        else {
            if (selectedIndex === 1) {
                return (
                    <GraphView routineData={testRoutineData} graphViewRef={graphViewRef} />
                )
            }
            else if (selectedIndex === 0) {
                return (
                    <div className="mapView">
                        <ThemeProvider theme={theme}>
                            <Timeline position="alternate" className="timelineMap">
                                {renderTimeLineItems()}
                            </Timeline>
                        </ThemeProvider>
                    </div>
                )
            }
        }
    }

    return (
        <div className="statsPanelDiv">
            <div className="featureBar">
                {renderOptions()}
            </div>
            <div className="divider"></div>
            <div className="presentationBar" ref={graphViewRef}>
                {selectedIndex !== null ? <div className="title">
                    <p>{Options[selectedIndex].title}</p>
                </div> : <></>}
                {renderPresentationComponent()}
            </div>
        </div>
    )
}

export default StatisticsPanel;