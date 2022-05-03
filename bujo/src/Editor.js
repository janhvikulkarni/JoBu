import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from 'react-draft-wysiwyg';
import DOMPurify from 'dompurify';
import draftToHtml from "draftjs-to-html";
import Button from 'react-bootstrap/Button';
import TextContext from './textbox-context';
import html2canvas from 'html2canvas';
import convert from 'htmr';

const EditorStyledToolbar = () => {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const [unconvertedContent, setUnconvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state)
    convertContentToHTML();
    convertContentToRaw();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  const convertContentToRaw = () => {
    let currentContentAsRaw = convertToRaw(editorState.getCurrentContent());
    setUnconvertedContent(currentContentAsRaw);
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

    let obj = {
      canvas: null,
      html: convertedContent,
      isDragging: false,
      x: 50,
      y: 50
    }

    function renderText() {
      console.log("renderText called");
      // convert DOM into image
      html2canvas(document.getElementById('text-container'), {
        backgroundColor: 'rgba(0,0,0,0)',
      }).then((canvas) => {
        obj.canvas = canvas;
      });
    }

    renderText();

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
        <div id="text-container">
          {convert(draftToHtml(unconvertedContent))}
        </div>
      </div>
    
  )
}

  export default EditorStyledToolbar;