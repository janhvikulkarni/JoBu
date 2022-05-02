import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import EditorStyledToolbar from './Editor';
import react, {useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  // state: is Editor component shown?
  const [showText, setShowText] = useState(false);

  let openEditor = () => {
    console.log("openEditor called");

    if (showText) {
      setShowText(false);
    } else {
      setShowText(true);
    }
    
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
                  <NavDropdown.Item>Sticker</NavDropdown.Item>
                  <NavDropdown.Item>Shape</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Media" id="media-dropdown">
                  <NavDropdown.Item>Image</NavDropdown.Item>
                  <NavDropdown.Item>Video</NavDropdown.Item>
                  <NavDropdown.Item>GIF</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      <Container id="text-container">
            <div>
              { showText ? <EditorStyledToolbar /> : null }        
            </div>          
      </Container>
      

    </div>
  );
}

export default App;
