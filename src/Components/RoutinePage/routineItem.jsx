import "../../Styles/RoutineItem.css"

const RoutineItem = (props) => {

    return (
        <div className="routineItem">
            {props.present 
            ? <div className="present">
                <div className="titleContainer">
                    <div className="titleHeading">
                        <h2 id="title">Routine Name</h2>
                        <p id="dateModified">Last Date</p>
                    </div>
                </div>

            </div>
                : <div className="null">
                    <p className="nullText">No routines available,      Create One</p>
                </div>}
        </div>
    );
}

export default RoutineItem;

