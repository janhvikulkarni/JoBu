import React, { Component } from 'react';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Editor } from 'react-draft-wysiwyg';
import ColorPic from './ColorPic'

const EditorStyledToolbar = () => (
    <Editor
      toolbarClassName="demo-toolbar-custom"
      wrapperClassName="demo-wrapper"
      editorClassName="demo-editor-custom"
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'textAlign', 'fontFamily', 'colorPicker'],
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
        colorPicker: { component: ColorPic },
      }}
    />
);

  export default EditorStyledToolbar;