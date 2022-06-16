import "../../Styles/RoutinePage/sideBar.css"
import React from 'react';
const SideBar = (props) => {
    return (
        <div id={props.id} className="sideBar">
            <p>{props.title}</p>
            <div className="divider"></div>
        </div>
    );
}

export default SideBar;