import React from "react";
import '../../../Styles/RoutineDisplay/Components/RoutineStatistics.css';
import { FlexibleXYPlot, VerticalBarSeries, XAxis, YAxis, LineSeries } from 'react-vis';

const RoutineStatistics = (props) => {

    const executionTimePublish = props.data.filter((data) => {
        return data.operation === "PUBLISH"
    }).map((data) => {
        return { x: data.title, y: data.executionTime }
    });

    const executionTimeSubscribe = props.data.filter((data) => {
        return data.operation !== "PUBLISH"
    }).map((data) => {
        return { x: data.title, y: data.executionTime }
    });

    const dataByteDataPublish = props.data.filter((dat) => {
        return dat.operation === "PUBLISH"

    }).map((dat) => {
        return {
            x: dat.title,
            y: dat.dataBytes
        }
    });

    const dataByteDataSubscribe = props.data.filter((dat) => {
        return dat.operation !== "PUBLISH"
    }).map((dat) => {
        return {
            x: dat.title,
            y: dat.dataBytes
        }
    });

    return (
        <div className="routineStatistics">

            <div className="dataBar">
                <p>Data Exchange(b) vs Routine</p>
                <div className="graph">
                    <FlexibleXYPlot className={"plot"} xType="ordinal">
                        <XAxis />
                        <YAxis />
                        <VerticalBarSeries data={dataByteDataPublish} barWidth={0.4} opacity={1} color={"rgb(245, 61, 61)"} />
                        <VerticalBarSeries data={dataByteDataSubscribe} barWidth={0.4} opacity={1} color={"rgb(0, 160, 198)"} />
                    </FlexibleXYPlot>
                </div>

            </div>
            <div className="execBar">
                <p>Execution Time(ms) vs Routine</p>
                <div className="graph2">
                    <FlexibleXYPlot className={"plot"} xType="ordinal">
                        <XAxis />
                        <YAxis />
                        <LineSeries data={executionTimePublish} color={"rgb(245, 61, 61)"}/>
                        <LineSeries data={executionTimeSubscribe} color={"rgb(0, 160, 198)"} />
                    </FlexibleXYPlot>
                </div>
                
            </div>
        </div>
        // feat: Routine Statistics Implemented
        //feat: Skeleton Complete RoutineStatistics
    )
}

export default RoutineStatistics;