import React from "react";
import { useState, useRef } from "react";

const CreateView = (props) => {

    const [author, updateAuthor] = useState("");
    const [title, updateTitle] = useState("");
    const [description, updateDescription] = useState("");
    const goButton = useRef();

    const handleAuthorInputChange = (event) => {
        updateAuthor(event.target.value);
    }

    const handleTitleInputChange = (event) => {
        updateTitle(event.target.value);
    }

    const handleDescriptionInputChange = (event) => {
        updateDescription(event.target.value);
    }

    const shakeCreateRoutineButton = () => {
        goButton.current.className = "goButtonAnim";
        setTimeout(() => {
            goButton.current.className = "goButton";
        }, 700);

    }

    const addRoutine = () => {
        if (title === "" || description === "" || author === ""){
            shakeCreateRoutineButton();
        }
        else {
            var time = new Date();
            var lastUpdate = `${time.getHours()}:${time.getMinutes()} ${time.getUTCDate()}/${time.getUTCMonth()}/${time.getUTCFullYear()}`
            props.addRoutine({title : title, description : description, lastUpdated : lastUpdate, author : author, isActive: false});
        }
    }

    return (
        <div className="routineCreationView">
            <div className="titleAuthorLayer">
                <div className="title">
                    <p>Routine Title</p>
                    <input type="text" placeholder="Routine Name" value={title} onChange={handleTitleInputChange} />
                </div>
                <div className="author">
                    <p>Author</p>
                    <input type="text" placeholder="Author Info" value={author} onChange={handleAuthorInputChange} />
                </div>
            </div>
            <div className="descriptionLayer">
                <p>Description</p>
                <textarea type="text" placeholder="Description of Routine" onChange={handleDescriptionInputChange} value={description} />
            </div>
            <div className="goButton" ref={goButton} onClick={addRoutine}>
                <p>Add Routine +</p>
            </div>
        </div>
    )


}

export default CreateView;