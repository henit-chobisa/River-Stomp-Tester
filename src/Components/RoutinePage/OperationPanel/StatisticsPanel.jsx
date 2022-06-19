import React, { useEffect, useRef, useState } from "react";
import '../../../Styles/RoutinePage/OperationPanel/StatisticsPanel.css'
import OptionButton from "./OptionButton";
import '../../../../node_modules/react-vis/dist/style.css';

import testRoutineData from "../../../Assets/testRoutineData";
import GraphView from "./GraphView";

import MapView from "./MapView";

const StatisticsPanel = (props) => {
    const graphViewRef = useRef();
    const [author, updateAuthor] = useState("");
    const [title, updateTitle] = useState("");
    const [description, updateDescription] = useState("");

    var innerHeight = 0;
    var innerWidth = 0;

    useEffect(() => {
        window.addEventListener("resize", (event) => {
            // if (event.target.innerHeight !== innerHeight || event.target.innerWidth !== innerWidth){
            //     if (selectedIndex === 1) {
            //         handleOptionClickCallback(1);
            //         console.log("Hello");
            //         innerHeight = event.target.innerHeight;
            //         innerWidth = event.target.innerWidth;
            //     }
            // }
        })
    });


    const addRoutine = () => {
        props.addRoutine({title : title, description : description, lastUpdated : "new", author : author, isActive: false});
    }

    const [selectedIndex, updateSelectedIndex] = useState(null);

    const [Options, UpdateOptions] = useState([{ key: 0, title: "Routine Map", isSelected: false }, { key: 1, title: "Graph", isSelected: false }, { key: 2, title: "Create Routine", isSelected: false }]);


    const handleOptionClickCallback = (index) => {
        const clone = [...Options];
        if (selectedIndex !== null) {
            clone[selectedIndex].isSelected = false;
        }
        updateSelectedIndex(index);
        clone[index].isSelected = true;
        UpdateOptions(clone);
    }

    const handleAuthorInputChange = (event) => {
        updateAuthor(event.target.value);
    }

    const handleTitleInputChange = (event) => {
        updateTitle(event.target.value);
    }

    const handleDescriptionInputChange = (event) => {
        updateDescription(event.target.value);
    }

    const renderOptions = () => {
        return Options.map((option) => (<OptionButton onClickOption={handleOptionClickCallback} index={option.key} isSelected={option.isSelected} title={option.title} />));
    }

    const renderPresentationComponent = () => {
        if (selectedIndex === null) {
            return <div className="warningView">
                <p className="noSelectionWarning">No Option Selected to Show, kindly select one :)</p>
            </div>

        }
        else {
            if (selectedIndex === 1) {
                return (
                    <GraphView routineData={testRoutineData} graphViewRef={graphViewRef} />
                )
            }
            else if (selectedIndex === 0) {
                return (
                   <MapView routineData={testRoutineData}/>
                )
            }
            else {
                return (
                    <div className="routineCreationView">
                        <div className="titleAuthorLayer">
                            <div className="title">
                                <p>Routine Title</p>
                                <input type="text" placeholder="Routine Name" value={title} onChange={handleTitleInputChange}/>
                            </div>
                            <div className="author">
                                <p>Author</p>
                                <input type="text" placeholder="Author Info" value={author} onChange={handleAuthorInputChange}/>
                            </div>
                        </div>
                        <div className="descriptionLayer">
                            <p>Description</p>
                            <textarea type="text" placeholder="Description of Routine" onChange={handleDescriptionInputChange} value={description}/>
                        </div>
                        <div className="goButton" onClick={addRoutine}>
                            <p>Add Routine +</p>
                        </div>
                    </div>
                )
            }
        }
    }

    return (
        <div className="statsPanelDiv">
            <div className="featureBar">
                {renderOptions()}
            </div>
            <div className="divider"></div>
            <div className="presentationBar" ref={graphViewRef}>
                {selectedIndex !== null ? <div className="title">
                    <p>{Options[selectedIndex].title}</p>
                </div> : <></>}
                {renderPresentationComponent()}
            </div>
        </div>
    )
}

export default StatisticsPanel;