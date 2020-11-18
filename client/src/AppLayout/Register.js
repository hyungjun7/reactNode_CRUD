import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

const Register = () => {

  const [input, setInput] = useState({
    user_id: '',
    user_pw: '',
    user_pw_chk: '',
    user_email: ''
  });

  const onChange = (e) => {
    const {value, name} = e.target;
    setInput({
      ...input,
      [name]: value
    });
  };

  const submit = async() => {
    const res = await fetch('/api/users/join', {
      method: 'POST',
      body: JSON.stringify({
        user_id: user_id,
        user_pw: user_pw,
        user_email: user_email,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    await res.json()
    .then((res) => {
      if(res.status === 'ok') {
        alert('회원가입 성공!');
        window.location.href = '/';
      } else {
        alert('아이디 중복');
      }
    })
    .catch(err => console.log(err));
  }

  const {user_id, user_pw, user_pw_chk, user_email} = input;

  const onClick = () => {
    if(user_pw !== user_pw_chk) {
      return alert('비밀번호가 일치하지 않습니다!');
    } else if(user_pw.length < 8) {
      return alert('비밀번호는 8자리 이상입니다.');
    }
    submit();
  }

  const style = {
    width: '40%',
    marginLeft: '25%',
    marginRight: '25%',
    border: '1px solid gray'
  }
    return (
      <div style={style} >
        <div style={{margin: '5%'}}>
        <Form>
            <Form.Group controlId="user_id">
              <Form.Label>아이디</Form.Label><br></br>
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
        
          <Form.Group controlId="chkPw">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control type="password" placeholder="비밀번호를 입력하세요" 
              name="user_pw_chk"
              value={user_pw_chk}
              onChange={onChange}
              />
            </Form.Group>

            <Form.Group controlId="user_email">
              <Form.Label>이메일</Form.Label>
              <Form.Control type="email" placeholder="이메일을 입력하세요"
              name="user_email"
              value={user_email}
              onChange={onChange}
              />
            </Form.Group>
            <Button variant="outline-success" onClick={onClick}>회원가입</Button>
          </Form>
          </div>
      </div>
    );
};

export default Register;