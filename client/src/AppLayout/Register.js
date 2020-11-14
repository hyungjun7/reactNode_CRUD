import React from 'react';
import { Form, Input, Button } from 'antd';


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
    const onFinish = (name) => {
        switch (name) {
            case 'user_id':
                
            break;
            case 'user_pw':

            break;
            case 'user_email':

            break;
            default:
                break;
        }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
      };
    return (
        <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
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
        <Button type="primary" htmlType="submit">
          회원가입
        </Button>
      </Form.Item>
    </Form>
    );
};

export default Register;