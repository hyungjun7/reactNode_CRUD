import React from "react";
import {Button, Form} from "react-bootstrap";
import {Modal} from "antd";


const LoginModal = ({onLogIn, user_id, user_pw, visible, cancleAction, onChange}) => {

    return (
      <>

          <Modal
              title="로그인"
              visible={visible}
              onCancel={cancleAction}
              wrapClassName='loginModal'
              keyboard={true}
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
}

export default LoginModal;