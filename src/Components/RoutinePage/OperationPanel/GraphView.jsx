import React, {useState} from "react";
import { FlexibleXYPlot, VerticalBarSeries, XAxis, YAxis, LineSeries } from 'react-vis';
import OptionButton from "./OptionButton";

const GraphView = (props) => {


    const executionTimePublish = props.routineData.routines.filter((data) => {
        return data.operation === "PUBLISH"
    }).map((data) => {
        return {x : data.title, y : data.executionTime}
    }) ;

    const executionTimeSubscribe = props.routineData.routines.filter((data) => {
        return data.operation !== "PUBLISH"
    }).map((data) => {
        return {x : data.title, y : data.executionTime}
    });

    const dataByteDataPublish = props.routineData.routines.filter((dat) => {
        return dat.operation === "PUBLISH"
   
    }).map((dat) => {
        return {
            x: dat.title,
            y: dat.dataBytes
        }
    });

    const dataByteDataSubscribe = props.routineData.routines.filter((dat) => {
        return dat.operation !== "PUBLISH"
    }).map((dat) => {
        return {
            x: dat.title,
            y: dat.dataBytes
        }
    });

    const [execView, updateExecView] = useState(true);

    const handleGraphViewOption = (index) => {
        if (index === 0) {
            updateExecView(false);
        }
        else {
            updateExecView(true);
        }
    }

    return (
        <div className="graphView">
                        <div className="graph">
                            <FlexibleXYPlot className="plot" xType="ordinal" height={props.graphViewRef.current.offsetHeight * 0.7} width = {props.graphViewRef.current.offsetWidth * 0.75}>
                                <XAxis/>
                                <YAxis/>
                                { execView === false ? <VerticalBarSeries data={dataByteDataPublish} barWidth={0.4} opacity={1} color={"rgb(245, 61, 61)"} /> : <></> } 
                                { execView === false ? <VerticalBarSeries data={dataByteDataSubscribe} barWidth={0.4} opacity={1} color={"rgb(0, 160, 198)"} /> : <></> } 
                                {execView === true ? <LineSeries data={executionTimePublish} color={"rgb(245, 61, 61)"}/> : <></>}
                                {execView === true ? <LineSeries data={executionTimeSubscribe} color={"rgb(0, 160, 198)"} /> : <></>}
                            </FlexibleXYPlot>
                        </div>
                        <div className="options">
                            <OptionButton onClickOption={handleGraphViewOption} index={0} isSelected={!execView} title={"Data Exchange"} />
                            <OptionButton onClickOption={handleGraphViewOption} index={1} isSelected={execView} title={"Execution Time"} />
                        </div>
                    </div>
    )
}

export default GraphView;