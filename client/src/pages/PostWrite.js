import React, {useState} from 'react';
import { Button, Form } from "react-bootstrap";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {Upload, message, Modal} from 'antd';
import {InboxOutlined} from '@ant-design/icons';

const {Dragger} = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: '#',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  
  const PostWrite = () => {
    const [content, setContent] = useState('');
    const [visible, setVisible] = useState(false);
  
    const showModal = () => {
      setVisible(true);
    };
  
    const okAction = (e) => {
      setVisible(false);
      window.history.back();
    };
  
    const cancleAction = (e) => {
      setVisible(false);
    };
    const margin1 = { margin: '1%' }
    const marginR1 = { marginRight: '1%' }
    const modules = {
        syntax: true,
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote', 'code-block'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      };

     const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote','code-block',
        'list', 'bullet', 'indent',
        'link', 'image'
      ];
    return (
        <div style={{ border: "1px solid gray" }}>
      <Form>
        <Form.Group style={margin1}>
            <Form.Label>제목</Form.Label>
            <Form.Control type="input" placeholder="제목을 입력하세요" />
        </Form.Group>

        <div style={margin1}>
         <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={content}
            onChange={setContent}
            className='ql-editer'
         />
        </div>

        <div style={margin1}>
        <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or Drag and Drop!</p>
  </Dragger>
        </div>
        <div style={{margin: '1%'}}>
            <Button variant="outline-success" style={marginR1}>작성 완료</Button>
            <Button variant="outline-success" style={marginR1}>임시 저장</Button>
            <Button variant="outline-success" onClick={showModal}>취소</Button>
            <Modal
              title="정말로 돌아가나요?"
              visible={visible}
              onOk={okAction}
              onCancel={cancleAction}
              footer={[
                <Button key="back" onClick={okAction}>확인</Button>,
                <Button key="submit" type="primary" onClick={cancleAction}>취소</Button>
              ]}>
              현재까지 작성하신 글은 저장되지 않습니다.
            </Modal>
            </div>
      </Form>
    </div>
    );
};

export default PostWrite;