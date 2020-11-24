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
  //로그인 상태관리를 위한 Context
  const {loggedIn, loginSuccess, logout} = useContext(IsLoggedIn);
  //인풋 태그 값 바뀌면 해당 인풋 태그의 name 값을 key 값으로 하여 value값을 바꾼다
  const onChange = (e) => {
    const {value, name} = e.target;
    setInput({
      ...input,
      [name]: value
    });
  };
  //모달 창 보여주세여
  const showModal = () => {
    onReset();
    setVisible(true);
  };
  //모달 창 닫아주세여
  const cancleAction = (e) => {
    onReset();
    setVisible(false);
  };

  const onLogOut = async () => {
    const res = await fetch('/api/users/logout')
    res.json()
      .then((res) => {
        if(res.status === 'ok') {
          logout();
          cancleAction();
        } else {
          alert('로그아웃 실패');
          cancleAction();
          onReset();
        }
      })
      .catch(err => console.log(err));
  };

  const onReset = () => {
    setInput({user_id: '', user_pw: ''});
  }

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
    await res.json()
    .then((res) => {
      console.log(res.status);
      if(res.status === 'ok') {
        loginSuccess();
        cancleAction();
      } else {
        //모달 창이 떠있는 상태에서 alert가 작동하지 않음! 왜 이럴까
        //모달 창의 텍스트에 직접 실패했다고 입력하는 것도 괜찮을듯 싶다.
        alert(res.status);
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
