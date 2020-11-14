import React, { useState } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import {Modal} from 'antd';
import Login from './Login';

function AppLayout(props, isLoggedIn) {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const okAction = (e) => {
    setVisible(false);
  };

  const cancleAction = (e) => {
    setVisible(false);
  };
  
  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        style={{ marginLeft: "15%", marginRight: "15%" }}
      >
        <Navbar.Brand href="/">step7`s blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title="Link" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">My GitHub</NavDropdown.Item>
              <NavDropdown.Item href="fromme.tk">FROmme</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Dev" id="basic-nav-dropdown">
              <NavDropdown.Item href="/dev/js">Javascript</NavDropdown.Item>
              <NavDropdown.Item href="/dev/react">React</NavDropdown.Item>
              <NavDropdown.Item href="/dev/node">Node.js</NavDropdown.Item>
              <NavDropdown.Item href="/dev/ts">Typescript</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/dev/java">Java</NavDropdown.Item>
              <NavDropdown.Item href="/dev/jsp">JSP</NavDropdown.Item>
              <NavDropdown.Item href="/dev/spring">
                Spring Framework
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/dev/etc">etc</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Hobby" id="basic-nav-dropdown">
              <NavDropdown.Item href="/hobby/photo">Photo</NavDropdown.Item>
              <NavDropdown.Item href="/hobby/gunpla">Gunpla</NavDropdown.Item>
              <NavDropdown.Item href="/hobby/trip">Trip</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {isLoggedIn ? (
            <>
            <Button
              variant="outline-success" 
              style={{ marginRight: "10px" }}
              onClick={showModal}
              >
              로그인
            </Button>
            <Modal
              title="로그인"
              visible={visible}
              onOk={okAction}
              onCancel={cancleAction}
              footer={[
                <Button key="back" onClick={cancleAction}>
                  취소
                </Button>,
                <Button key="submit" type="primary" onClick={okAction}>
                  로그인
                </Button>
              ]}>
              <Login />
            </Modal>
            </>
          ) : (
            ""
          )}
          <Form inline>
            <FormControl type="text" placeholder="" className="mr-sm-2" />
            <Button variant="outline-success">검색</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ marginRight: "20%", marginLeft: "20%", marginTop: "1%" }} >
        {props.children}
      </div>
    </>
  );
}

export default AppLayout;
