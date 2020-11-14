import React from "react";
import { Form, Input } from "antd";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 25,
  },
};

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{marginLeft: '10%', marginRight: '10%'}}>
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
            message: "아이디 또는 비밀번호를 확인해주세요",
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
            message: "아이디 또는 비밀번호를 확인해주세요",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
    </Form>
    </div>
  );
};

//Parsing error: 'import' and 'export' may only appear at the top level
//괄호에 유의
export default Login;
