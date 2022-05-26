
const SubsItem = (props) => {

    const handleCancel = () => {
        props.handleListPop(props.index)
    }

    const handleOverClick = () => {
        
    }

    return (
        <div className='subsItem' onClick={handleOverClick}>
            {props.route}
            <button onClick={handleCancel}>
                x
            </button>
        </div>
    )
}

export default SubsItem;