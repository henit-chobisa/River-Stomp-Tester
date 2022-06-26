import '../../Styles/EditorComp.css'
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import React from 'react';

const EditorComp = (props) => {
    const hightlightWithLineNumbers = (input, language) => {
        return highlight(input, language).split("\n").map((line, i) => `<span class='editorLineNumber'>${i + 1}\t</span>${line}`).join("\n")
    };

    const handleValueChange = (code) => {
        props.handlePersistence(code, props.id);
        props.updateData(code);
    }

    return (
        <div className='subsEditor'>
            <Editor
                className='seditor'
                value={props.data}
                textareaId="codeArea"
                onValueChange={(code) => handleValueChange(code)}
                highlight={(code) => hightlightWithLineNumbers(code, languages.js)}
                padding="30px"
            />
        </div>
    );
}

export default EditorComp;