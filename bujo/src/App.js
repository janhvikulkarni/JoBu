import logo from './logo.svg';
import './App.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">BuJo</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#link">Text</Nav.Link>
                <NavDropdown title="Decorate" id="decorate-dropdown">
                  <NavDropdown.Item href="#action/3.1">Sticker</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Shape</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Media" id="media-dropdown">
                  <NavDropdown.Item href="#action/3.1">Image</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Video</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">GIF</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  );
}

export default App;
