import React from "react";
import '../../../Styles/RoutineDisplay/Components/CreateSubRoutine.css'
import EditorComp from "../../SimpleTestingPage/EditorComp";
import { useState } from "react";
import OptionButton from "../../RoutinePage/OperationPanel/OptionButton";
var defaultBody = "{\n\t\"message\" : \"Insert your body here\"\n}";
var defaultHeader = "{\n\t\"message\" : \"Insert your header here\"\n}"

const CreateSubRoutine = (props) => {

    const [data, updateData] = useState(defaultBody);
    const [header, updateHeader] = useState(defaultHeader);
    const [bodySelected, updateBodySelected] = useState(true);
    const [typeSelection, updateTypeSelection] = useState("PUBLISH");
    const [description, updateDescription] = useState("");
    const [route, updateRoute] = useState("");
    const [title, updateTitle] = useState("");
    

    const handlePersistence = () => {}

    const handleDataOptionClick = (index) => {
        if (index === 0){
            updateBodySelected(true);
        }
        else {
            updateBodySelected(false);
        }
    }

    const handleTitleChange = (event) => {
        updateTitle(event.target.value);
    }

    const handleDescriptionInputChange = (event) => {
        updateDescription(event.target.value);
    }

    const addSubRoutine = () => {
        if (title === "" || route === "" || description === "" || data === "" , header === ""){

        }
        else {
            const subRoutine = typeSelection === "PUBLISH" ? {
                id : Math.floor(Math.random() * 10000),
                title: title,
                operation: typeSelection,
                route: route,
                description: description,
                body: data,
                headers: header,
                executionTime: 0,
                dataBytes: 0,
                isSelected : false
            } : {
                id : Math.floor(Math.random() * 10000),
                title: title,
                operation: typeSelection,
                route: route,
                description: description,
                data: data,
                executionTime: 0,
                dataBytes: 0,
                isSelected : false
            }

        }

    }

    const handleRouteChange = (event) => {
        updateRoute(event.target.value);
    }

    const handleTypeSelection = (event) => {
        console.log(event.target.value);
        updateTypeSelection(event.target.value);
    }

    // feat: Created editor for subroutine creation

    return (
        <div className="createSubRoutine">
            <div className="contentSection">
                <div className="basics">
                    <div className="subRTitle">
                        <p>Title</p>
                        <input type="text" value={title} onChange={handleTitleChange} placeholder="Subroutine Title" />
                    </div>
                    <div className="subRType">
                        <p>Operation</p>
                        <select name="Select" id="" value={typeSelection} onChange={handleTypeSelection}>
                            <option value="SUBSCRIBE">SUBCRIBE</option>
                            <option value="PUBLISH">PUBLISH</option>
                        </select>
                    </div>
                </div>
                <div className="route">
                        <p>Route</p>
                        <input type="text" value={route} onChange={handleRouteChange} placeholder="Route for Operation" />
                </div>
                {typeSelection === "PUBLISH" ? <div className="dataInput">
                    <div className="dataOptions">
                        <OptionButton title={"Body"} isSelected={bodySelected} index={0} onClickOption={handleDataOptionClick}/>
                        <OptionButton title={"Headers"} index={1} onClickOption={handleDataOptionClick} isSelected={!bodySelected}/>
                    </div>
                    <div className="editor">
                        <EditorComp data={ bodySelected ? data : header} handlePersistence={handlePersistence} updateData={bodySelected ? updateData : updateHeader}/>
                    </div>
                </div> : <></>}
                <div className="sRDescription">
                    <div className="heading">
                        <p>Description</p>
                    </div>
                    <div className="container">
                        <textarea type="text" placeholder="Description of Subroutine" onChange={handleDescriptionInputChange} value={description}></textarea>
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