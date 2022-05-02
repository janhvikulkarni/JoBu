import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from 'react-draft-wysiwyg';
import DOMPurify from 'dompurify';

const Editor = () => {

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
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
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      toolbarClassName="demo-toolbar-custom"
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor-custom"
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'textAlign', 'fontFamily'],
        inline: {
          options: ['bold', 'italic'],
          bold: { className: 'demo-option-custom' },
          italic: { className: 'demo-option-custom' },
        },
        blockType: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
        fontSize: { className: 'demo-option-custom-medium' },
        textAlign: {
          options: ['left', 'center', 'right'],
          left: { className: 'demo-option-custom' },
          center: { className: 'demo-option-custom' },
          right: { className: 'demo-option-custom' },
        },
        fontFamily: { className: 'demo-option-custom-wide', dropdownClassName: 'demo-dropdown-custom' },
      }}
    />
  )
    }

  export default Editor;