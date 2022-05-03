import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from 'react-draft-wysiwyg';
import DOMPurify from 'dompurify';
import Button from 'react-bootstrap/Button';
import TextContext from './textbox-context';
import html2canvas from 'html2canvas';


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
    
    // draftToHtml(convertToRaw(convertedContent));

    let obj = {
      html: convertedContent,
      isDragging: false,
      x: 50,
      y: 50
    }
    let arr = textboxes;
    arr.push(obj); // add new textbox info to arr

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
            options: ['inline', 'textAlign'],
            inline: {
              // options: ['bold', 'italic'],
              bold: { className: 'demo-option-custom' },
              italic: { className: 'demo-option-custom' },
            },            
            textAlign: {
              options: ['left', 'center', 'right'],
              left: { className: 'demo-option-custom' },
              center: { className: 'demo-option-custom' },
              right: { className: 'demo-option-custom' },
            },
          }}
        />
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    
  )
    }

  export default EditorStyledToolbar;