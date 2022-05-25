
const SubsItem = (props) => {
    return (
        <div className='subsItem'>
            {props.route}
            <button onClick={props.handleListPop(props.index)}>
                x
            </button>
        </div>
    )
}

export default SubsItem;