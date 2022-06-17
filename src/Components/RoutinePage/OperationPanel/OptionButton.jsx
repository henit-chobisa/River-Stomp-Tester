import '../../../Styles/RoutinePage/OperationPanel/OptionButton.css'
import React, { useEffect, useRef } from "react"

const OptionButton = (props) => {

    const titleReference = useRef();
    
    useEffect(() => {
        if (props.isSelected === true){
            titleReference.current.style.color = "rgb(0, 160, 198)"
        }
        else {
            titleReference.current.style.color = "white"
        }
    })

    return (
        <div className="optionButton">
            <p ref={titleReference}>{props.title}</p>
        </div>
    )
}

export default OptionButton;