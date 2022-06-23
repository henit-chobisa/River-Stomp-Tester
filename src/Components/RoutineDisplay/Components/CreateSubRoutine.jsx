import React from "react";
import '../../../Styles/RoutineDisplay/Components/CreateSubRoutine.css'
import EditorComp from "../../SimpleTestingPage/EditorComp";
import { useState } from "react";
import OptionButton from "../../RoutinePage/OperationPanel/OptionButton";
var defaultBody = "{\n\t\"message\" : \"Insert your body here\"\n}";

const CreateSubRoutine = () => {

    const [data, updateData] = useState(defaultBody);

    const handlePersistence = () => {}

    // feat: Created editor for subroutine creation

    return (
        <div className="createSubRoutine">
            <div className="contentSection">
                <div className="basics">
                    <div className="subRTitle">
                        <p>Title</p>
                        <input type="text" placeholder="Subroutine Title" />
                    </div>
                    <div className="subRType">
                        <p>Operation</p>
                        <select name="Select" id="">
                            <option value="SUBSCRIBE">SUBCRIBE</option>
                            <option value="PUBLISH">PUBLISH</option>
                        </select>
                    </div>
                </div>
                <div className="route">
                        <p>Route</p>
                        <input type="text" placeholder="Route for Operation" />
                </div>
                <div className="dataInput">
                    <div className="dataOptions">
                        <OptionButton title={"Body"} isSelected={true}/>
                        <OptionButton title={"header"}/>
                    </div>
                    <div className="editor">
                        <EditorComp data={data} handlePersistence={handlePersistence} updateData={updateData}/>

                    </div>
                </div>
            </div>
            <div className="saveButtonSection">
                <div className="saveButton">
                    <p>Initialize Subroutine</p>
                </div>
            </div>

        </div>
    )

}

export default CreateSubRoutine;