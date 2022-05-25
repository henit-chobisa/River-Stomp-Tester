
const SubsItem = (props) => {

    const handleCancel = () => {
        props.handleListPop(props.index)
    }

    return (
        <div className='subsItem'>
            {props.route}
            <button onClick={handleCancel}>
                x
            </button>
        </div>
    )
}

export default SubsItem;