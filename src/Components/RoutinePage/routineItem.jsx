import "../../Styles/RoutineItem.css"

const RoutineItem = (props) => {

    return (
        <div className="routineItem">
            {props.present
            ? <div className="present">
                <h3 id="heading">RoutineHeading</h3>
                <p id="lastUpdate">last updated</p>
            </div>
                : <div className="null">
                    <p className="nullText">No routines available,      Create One</p>
                </div>}
        </div>
    );
}

export default RoutineItem;

