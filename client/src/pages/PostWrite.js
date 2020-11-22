import React, {useState} from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import 'react-quill/dist/quill.snow.css';
import { Modal} from 'antd';
import { Link, Redirect } from 'react-router-dom';
import {Editor} from "react-draft-wysiwyg";
import {EditorState, convertToRaw} from "draft-js";
import uploadImageCallBack from '../lib/imguApi';
import draftToHtml from 'draftjs-to-html';



  
  const PostWrite = () => {
    
    const [content, setContent] = useState({
      editorState: EditorState.createEmpty()
    });
    const [input, setInput] = useState({
      title: '',
      category: ''
    });
    const [visible, setVisible] = useState(false);
    const {title, category} = input;
    const showModal = () => {
      setVisible(true);
    };
    
    const onClick = async () => {
      console.log('/api/posts/'+category);
      const res = await fetch('/api/posts/'+category, {
        method: 'POST',
        body: JSON.stringify({
          title: title,
          content: draftToHtml(convertToRaw(content.editorState.getCurrentContent())),
          category: category
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await res.json()
      .then((res) => {
        if(res.status === 'ok') {
          return <Redirect to="/" />
        }
      })
      .catch((err)=>console.log(err))
      
    }
    
  
    const cancleAction = (e) => {
      setVisible(false);
    };
    const margin1 = { margin: '1%' }
    const marginR1 = { marginRight: '1%' }
    
      
      const onChange = (e) => {
        const {name, value} = e.target;
        setInput({
          ...input,
          [name]: value
        })
        console.log(input);
      }

      const onEditorStateChange = (editorState) => {
        console.log(draftToHtml(convertToRaw( editorState.getCurrentContent() ) ) );
        setContent({
          editorState,
        })
      }
      

    
    return (
        <div style={{ border: "1px solid gray" }}>
      <Form>
      <Row>
        <Form.Group style={margin1} as={Col}>
            <Form.Label>제목</Form.Label>
            <Form.Control name="title" value={title} onChange={onChange} type="input" placeholder="제목을 입력하세요" />
        </Form.Group>
        <Form.Group style={margin1} as={Col}>
            <Form.Label>카테고리</Form.Label>
            <Form.Control name="category" value={category} onChange={onChange} as="select" defaultValue="category">
            <option>category</option>
            <option>nodejs</option>
            <option>react</option>
            <option>ts</option>
            <option>js</option>
            <option>jsp</option>
            <option>spring</option>
            <option>etc</option>
            <option>java</option>
            <option>photo</option>
            <option>gunpla</option>
            <option>trip</option>
            </Form.Control>
        </Form.Group>
        </Row>

        <div style={margin1}>
        <div className='editor'>
      <Editor
        editorState={content.editorState}
        onEditorStateChange={onEditorStateChange}    
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
          image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: false } },
        }}
      />
    </div>
        </div>

        <div style={margin1}>
        
        </div>
        <div style={{margin: '1%'}}>
            <Button variant="outline-success" style={marginR1} onClick={onClick}>작성 완료</Button>
            <Button variant="outline-success" style={marginR1}>임시 저장</Button>
            <Button variant="outline-success" onClick={showModal}>뒤로가기</Button>
            <Modal
              title="정말로 돌아가나요?"
              visible={visible}
              onCancel={cancleAction}
              footer={[
                <><Link to="/"><Button key="back">확인</Button></Link>
                <Button key="submit" type="primary" onClick={cancleAction}>취소</Button></>
              ]}>
              현재까지 작성하신 글은 저장되지 않습니다.
            </Modal>
            </div>
      </Form>
    </div>
    );
};

export default PostWrite;