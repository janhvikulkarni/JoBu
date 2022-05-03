import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from 'react-draft-wysiwyg';
import DOMPurify from 'dompurify';
import Button from 'react-bootstrap/Button';
import TextContext from './textbox-context';

const EditorStyledToolbar = () => {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state)
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  // context provider: textboxes
  let { textboxes, setTextboxes } = React.useContext(TextContext);

  let onSubmit = () => {
    console.log("onSubmit called");

    let arr = textboxes;
    arr.push(convertedContent); // add new textbox content to arr

    setTextboxes([...arr]); // update textboxes
  }

  return (
      <div style={{width: '400px'}} class="border border-primary">
        <Editor
          draggable
          editorState={editorState}
          onEditorStateChange={handleEditorChange}
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: ['inline', 'blockType', 'fontSize', 'textAlign', 'fontFamily'],
            inline: {
              // options: ['bold', 'italic'],
              bold: { className: 'demo-option-custom' },
              italic: { className: 'demo-option-custom' },
            },
            blockType: { 
              inDropdown: true,
              options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
              className: 'demo-option-custom-wide', 
              dropdownClassName: 'demo-dropdown-custom' 
            },
            fontSize: { 
              options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
              className: 'demo-option-custom-medium' 
            },
            textAlign: {
              options: ['left', 'center', 'right'],
              left: { className: 'demo-option-custom' },
              center: { className: 'demo-option-custom' },
              right: { className: 'demo-option-custom' },
            },
            fontFamily: { 
              options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
              className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' 
          },
          }}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    
  )
    }

  export default EditorStyledToolbar;