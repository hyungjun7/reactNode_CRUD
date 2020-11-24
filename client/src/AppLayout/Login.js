import React, { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { Modal } from "antd";
import {IsLoggedIn} from '../context/context'
import LoginModal from "../components/LoginModal";

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
      console.log(res);
      if(res.status === 'ok') {
        loginSuccess();
        cancleAction();
      } else {
        //모달 창이 떠있는 상태에서 alert가 작동하지 않음! 왜 이럴까 -> 해결
          //서버에서 제이슨말고 문자열이 날아왔음
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
    <LoginModal
        cancleAction={cancleAction}
        onLogIn={onLogIn}
        user_id={user_id}
        user_pw={user_pw}
        visible={visible}
        onChange={onChange}
    />
    </>
  );
};

//Parsing error: 'import' and 'export' may only appear at the top level
//괄호에 유의
export default Login;
