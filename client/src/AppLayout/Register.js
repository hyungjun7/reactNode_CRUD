import React from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
const {getFieldValues} = Form;

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
const Register = () => {
    
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };

      const onSubmit = async() => {
        
        console.log('sadas');
        axios.post('/users/join', {
          user_id: getFieldValues('user_id'),
          user_pw: getFieldValues('user_pw'),
          user_email: getFieldValues('user_email'),
        })
      }
    return (
        <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinishFailed={onFinishFailed}
      
    >
      <Form.Item
        label="아이디"
        name="user_id"
        rules={[
          {
            required: true,
            message: "아이디가 조건에 맞지 않습니다.",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="비밀번호"
        name="user_pw"
        rules={[
          {
            required: true,
            message: "비밀번호가 다릅니다.",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="비밀번호 확인"
        name="chk_password"
        rules={[
          {
            required: true,
            message: "비밀번호가 다릅니다.",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
        
      <Form.Item
        label="이메일"
        name="user_email"
        rules={[
          {
            required: true,
            message: "이메일을 확인해주세요",
          },
        ]}
      >
        <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" onClick={onSubmit}>
          회원가입
        </Button>
      </Form.Item>
    </Form>
    );
};

export default Register;