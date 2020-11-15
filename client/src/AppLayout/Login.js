import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "antd";
import {IsLoggedIn} from '../context/context'

const Login = (props) => {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState({
    user_id: '',
    user_pw: ''
  });
  
  const {user_id, user_pw} = input;
  const {loggedIn, loginSuccess, logout} = useContext(IsLoggedIn);

  const onChange = (e) => {
    const {value, name} = e.target;
    setInput({
      ...input,
      [name]: value
    });
  };

  const showModal = () => {
    setVisible(true);
  };

  const cancleAction = (e) => {
    setVisible(false);
  };

  const onLogOut = () => {
    cancleAction();
    logout();
  };

  const onLogIn = async() => {
    const res = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        user_id: user_id,
        user_pw: user_pw,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const body = res.json()
    .then(body => {
      if(body[0].chk === 1) {
        loginSuccess();
        cancleAction();
      }
    })
    .catch(err => console.log(err));
  };

  return loggedIn ? (
    <>
      <Button
        variant="outline-success"
        style={{ marginRight: "10px" }}
        onClick={showModal}
      >
        로그아웃
      </Button>
      <Modal
        title="로그아웃"
        visible={visible}
        onCancel={cancleAction}
        footer={[
          <Button key="back" onClick={cancleAction}>
            취소
          </Button>,
          <Button key="submit" type="primary" onClick={()=>onLogOut()}>
            로그아웃
          </Button>,
        ]}
      >
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
          정말로 로그아웃 하시겠습니까?
        </div>
      </Modal>
    </>
  ) : (
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
        onCancel={cancleAction}
        footer={[
          <Button key="back" onClick={cancleAction}>
            취소
          </Button>,
          <Button key="submit" type="primary" onClick={onLogIn}>
            로그인
          </Button>,
        ]}
      >
        <div style={{ marginLeft: "10%", marginRight: "10%" }}>
          <Form>
            <Form.Group controlId="user_id">
              <Form.Label>아이디</Form.Label>
              <Form.Control type="input" placeholder="아이디를 입력하세요"
              name="user_id"
              value={user_id}
              onChange={onChange}
              />
            </Form.Group>

            <Form.Group controlId="user_pw">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control type="password" placeholder="비밀번호를 입력하세요" 
              name="user_pw"
              value={user_pw}
              onChange={onChange}
              />
            </Form.Group>
          </Form>
        </div>
      </Modal>
    </>
  );
};

//Parsing error: 'import' and 'export' may only appear at the top level
//괄호에 유의
export default Login;
