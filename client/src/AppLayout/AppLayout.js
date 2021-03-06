import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Login from "./Login";
import { IsLoggedIn } from "../context/context";

function AppLayout(props) {
  const { loggedIn } = useContext(IsLoggedIn);
  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        style={{ marginLeft: "15%", marginRight: "15%" }}
      >
        <Link to="/">
          <Navbar.Brand>step7`s blog</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/about">
              <Nav.Link>About</Nav.Link>
            </Link>
            <NavDropdown title="Link" id="basic-nav-dropdown">
              <NavDropdown.Item><a href="https://github.com/step7568" target="_blank" rel="noopener noreferrer">
                My GitHub
              </a></NavDropdown.Item>
              <NavDropdown.Item><a href="http://fromme.tk" target="_blank" rel="noopener noreferrer">
                FROmme
              </a></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Dev" id="basic-nav-dropdown">
              <Link to="/dev/js">
                <NavDropdown.Item href="/dev/js">Javascript</NavDropdown.Item>
              </Link>
              <Link to="/dev/react">
                <NavDropdown.Item href="/dev/react">React</NavDropdown.Item>
              </Link>

                <NavDropdown.Item><Link to="/dev/nodejs">Node.js</Link></NavDropdown.Item>

              <Link to="/dev/ts">
                <NavDropdown.Item href="/dev/ts">Typescript</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <Link to="/dev/java">
                <NavDropdown.Item href="/dev/java">Java</NavDropdown.Item>
              </Link>
              <Link to="/dev/jsp">
                <NavDropdown.Item href="/dev/jsp">JSP</NavDropdown.Item>
              </Link>
              <Link to="/dev/spring">
                <NavDropdown.Item href="/dev/spring">Spring Framework</NavDropdown.Item>
              </Link>
              <NavDropdown.Divider />
              <Link to="/dev/etc">
                <NavDropdown.Item href="/dev/etc">etc</NavDropdown.Item>
              </Link>
            </NavDropdown>
            <NavDropdown title="Hobby" id="basic-nav-dropdown">
              <Link to="/hobby/photo">
                <NavDropdown.Item href="/hobby/photo">Photo</NavDropdown.Item>
              </Link>
              <Link to="/hobby/gunpla">
                <NavDropdown.Item href="/hobby/gunpla">Gunpla</NavDropdown.Item>
              </Link>
              <Link to="/hobby/trip">
                <NavDropdown.Item href="/hobby/trip">Trip</NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
          {!loggedIn && (
            <Link to="#" style={{ marginRight: "1%" }}>
              <Button variant="outline-success" onClick={()=>alert('현재 회원가입 제한해놨습니다.')}>회원가입</Button>
            </Link>
          )}
          <Login />

          <Form inline>
            <FormControl type="text" placeholder="" className="mr-sm-2" />
            <Button variant="outline-success">검색</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ marginRight: "20%", marginLeft: "20%", marginTop: "1%" }}>
        {props.children}
      </div>
    </>
  );
}

export default AppLayout;
