import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import EditorStyledToolbar from './Editor';
import React, {useState, useEffect} from 'react';
import Modal from './Modal'
import TextContext from './textbox-context';
import {Stage, Layer, Text, Circle, Rect, Star} from "react-konva";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  // state: is Editor component shown?
  const [showEditor, setShowEditor] = useState(false);
  const [file, setFile] = useState();
  function handleChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
      setIsOpen(false);
  }
  
  // function to show/hide Editor component
  let openEditor = () => {
    console.log("openEditor called");

    if (showEditor) {
      setShowEditor(false);
    } else {
      setShowEditor(true);
    }
    
  }

  // parent state: array of textbox contents
  const [textboxes, setTextboxes] = useState([]);
  const textbox_value = { textboxes, setTextboxes };

  // states for arrays of decorate items
  const[circles, setCircles] = useState([]);
  const[rectangles, setRectangles] = useState([]);
  const[stars, setStars] = useState([]);

  let startDrag = (item) => {
    console.log("startDrag called");
    item.isDragging = true;
  }

  let stopDrag = (e, item) => {
    console.log("stopDrag called");
    item.isDragging = false;
    item.x = e.target.x();
    item.y = e.target.y();
  }

  let addCircle = () => {
    console.log("addCircle called");

    let obj = {
      isDragging: false,
      x: 50,
      y: 50
    }

    let arr = circles;
    arr.push(obj);
    setCircles([...arr]);
  }

  let addRectangle = () => {
    console.log("addRectangle called");

    let obj = {
      isDragging: false,
      x: 50,
      y: 50
    }

    let arr = rectangles;
    arr.push(obj);
    setRectangles([...arr]);
  }

  let addStar = () => {
    console.log("addStar called");

    let obj = {
      isDragging: false,
      x: 50,
      y: 50
    }

    let arr = stars;
    arr.push(obj);
    setStars([...arr]);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>BuJo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={openEditor}>Text</Nav.Link>
              <NavDropdown title="Decorate" id="decorate-dropdown">
                <NavDropdown.Item onClick={addCircle}>Circle</NavDropdown.Item>
                <NavDropdown.Item onClick={addRectangle}>Rectangle</NavDropdown.Item>
                <NavDropdown.Item onClick={addStar}>Star</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Media" id="media-dropdown">
              <Nav.Link onClick={() => setIsOpen(true)}>Image</Nav.Link>
                  <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                  <input type="file" onChange={handleChange} />
                  </Modal>
                  <Nav.Link onClick={() => setIsOpen(true)}>Video</Nav.Link>
                  <Nav.Link onClick={() => setIsOpen(true)}>GIF</Nav.Link>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <TextContext.Provider value={textbox_value}>
        { showEditor ? <EditorStyledToolbar /> : null }
      </TextContext.Provider>
      <img src={file} id="upload"/>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {textboxes.map(item => {
            console.log(item);
            return(
              <Text
                text={item.html}
                x={item.x} 
                y={item.y} 
                draggable  
                onDragStart={(item) => { startDrag(item); }}
                onDragEnd={(e) => { stopDrag(e, item); }}>
              </Text>
              )
          })}
        </Layer>
        <Layer>
          {circles.map(item => {
            console.log(item);
            return(
              <Circle
                x={item.x} 
                y={item.y} 
                radius={50}
                fill="red"
                draggable  
                onDragStart={(item) => { startDrag(item); }}
                onDragEnd={(e) => { stopDrag(e, item); }}>
              </Circle>
              )
          })}
        </Layer>
        <Layer>
          {rectangles.map(item => {
            console.log(item);
            return(
              <Rect
                x={item.x} 
                y={item.y} 
                width={50}
                height={50}
                fill="green"
                draggable  
                onDragStart={(item) => { startDrag(item); }}
                onDragEnd={(e) => { stopDrag(e, item); }}>
              </Rect>
              )
          })}
        </Layer>
        <Layer>
          {stars.map(item => {
            console.log(item);
            return(
              <Star
                x={item.x} 
                y={item.y} 
                numPoints={5}
                innerRadius={20}
                outerRadius={40}
                fill="blue"
                draggable  
                onDragStart={(item) => { startDrag(item); }}
                onDragEnd={(e) => { stopDrag(e, item); }}>
              </Star>
              )
          })}
        </Layer>
      </Stage> 
    </div>
  );
}

export default App;
