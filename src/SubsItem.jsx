
import {useSubscription, useStompClient} from "react-stomp-hooks"

const SubsItem = (props) => {

    const handleMessage = (message) => {
        props.handleSubsMessage(message.body, props.index);
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
                backgroundColor: "rgb(239, 118, 122)"
            }
        }
        else {
            return {
                backgroundColor: "rgb(0, 160, 198)"
            }

        }
    }

    return (
        <div className='subsItem' style={activation()} onClick={handleOverClick}>
            {props.route}
            <button onClick={handleCancel}>
                x
            </button>
        </div>
    )
}

export default SubsItem;