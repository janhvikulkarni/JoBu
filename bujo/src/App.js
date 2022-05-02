import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import EditorStyledToolbar from './Editor';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let openEditor = () => {
    console.log("openEditor called");

    return (
      <EditorStyledToolbar />
    )
  }


  return (
    <div className="App">
      <header>
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
      </header>
      <EditorStyledToolbar />
    </div>
  );
}

export default App;
