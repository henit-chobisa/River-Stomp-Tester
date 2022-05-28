
import {useSubscription} from "react-stomp-hooks"
import { useRef } from "react"

const SubsItem = (props) => {

    const itemRef = useRef();
    const handleMessage = (message) => {
        props.handleSubsMessage(message.body, props.index);
        itemRef.current.className = "subItemAnim";
        setTimeout(() => {
            itemRef.current.className = "subsItem"
    }, 700);
    }
    
    useSubscription(props.route, handleMessage)
    
    
    const handleCancel = () => {
        props.handleListPop(props.index)
    }

    const handleOverClick = (e) => {
        props.handleSubsClick(props.index, e.target);
    }


    const activation = () => {
        
        if(props.isActive === true){
            return {
                backgroundColor: "rgb(239, 118, 122)",
            }
        }
        else {
            return {
                backgroundColor: "rgb(0, 160, 198)"
            }

        }
    }

    return (
        <div className='subsItem' style={activation()} ref={itemRef} onClick={handleOverClick}>
            <p>{props.route}</p>
            <button onClick={handleCancel}>
                x
            </button>
        </div>
    )
}

export default SubsItem;