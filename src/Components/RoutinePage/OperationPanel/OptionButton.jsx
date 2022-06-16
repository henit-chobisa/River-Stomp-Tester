import '../../../Styles/RoutinePage/OperationPanel/OptionButton.css'
import React from "react"

const OptionButton = (props) => {
    return (
        <div className="optionButton">
            <p>{props.title}</p>
        </div>
    )
}

export default OptionButton;