import React from 'react';

const routeItem = (props) => {

    const handleSelfClick = (evt) => {
        props.handleSelection(props.index, evt.target);
    }

    const activation = () => {
        if(props.isActive === true){
            
            return {
                backgroundColor: "rgb(239, 118, 122)"
            }
        }
        else {
            return {
                backgroundColor: "rgb(0, 160, 198)"
            }

        }
    }

    const handleSelfDelete = () => {
        props.handleRoutePop(props.index);
    }

    return (
        <div className="routeItem" style={activation()} onClick={handleSelfClick}>
            <p style={{cursor:"pointer"}}>{props.route}</p>
            <button onClick={handleSelfDelete}>x</button>
        </div>

    )
}

export default routeItem;