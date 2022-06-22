import React from "react";
import '../../Styles/Generic/StatisticTitle.css'

const StatisticTitle = (props) => {
    return (
        <div className="statisticTitle">
            <div className="heading">
                <p>{props.heading}</p>
            </div>
            <div className="divider"></div>
            <div className="stat">
                <p className="num">{props.num}</p>
                <p className="unit">{props.unit}</p>
            </div>
        </div>
    )
}

export default StatisticTitle;