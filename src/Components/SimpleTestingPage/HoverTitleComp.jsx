import React from 'react';

const HoverTitleComp = (props) => {

    return (
        props.routeSelected === true ? <div className="titleContainer">
                        {props.title}
                    </div> : <></>
    )

}

export default HoverTitleComp;