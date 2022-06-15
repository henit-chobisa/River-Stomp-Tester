import "../../Styles/RoutinePage/sideBar.css"
import React from 'react';
const SideBar = (props) => {
    return (
        <div id={props.id} className="sideBar">
            <h2>{props.title}</h2>
            <div className="divider"></div>
        </div>
    );
}

export default SideBar;