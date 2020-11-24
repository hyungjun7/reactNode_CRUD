import React, {useEffect, useState} from 'react';
import { Button, Form, Row, Col } from "react-bootstrap";
import { Modal} from 'antd';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {Editor} from "react-draft-wysiwyg";
import ContentState, {EditorState, convertToRaw, convertFromHTML} from "draft-js";
import uploadImageCallBack from '../lib/imguApi';
import draftToHtml from 'draftjs-to-html';
import {callApi} from "../lib/callApi";


const PostWrite = () => {
    const location = useLocation();
    const [input, setInput] = useState({
      title: '',
      category: ''
    });
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState({
        editorState: EditorState.createEmpty()
    });

    useEffect( () => {
        if(location.search) {
            callApi(`/api/posts/view?id=${location.search.split('=')[1]}`)
                .then((res) => {

                    const blocksFromHTML = convertFromHTML(res.post_content);
                    console.log(blocksFromHTML)
                    const state = ContentState.ContentState.createFromBlockArray(
                        blocksFromHTML.contentBlocks,
                        blocksFromHTML.entityMap,
                    );

                    setContent({
                        editorState: EditorState.createWithContent(state),
                    })
                    // //공식 문서대로 하면 오류가 발생하는데, 컨텐츠스테이트 안에 또 정의되어 있는 컨텐츠스테이트를 사용하면 된다.
                    // // draft_js__WEBPACK_IMPORTED_MODULE_6___default.a.createFromBlockArray is not a function
                    setContent({
                        editorState: EditorState.createWithContent(state),
                    })
                    setInput({
                        title: res.post_title,
                        category: res.Board.board_name
                    });
                })
                .catch(err => console.log(err)
            )
        }
    }, [location.search])

    const {title, category} = input;

    const showModal = () => {
      setVisible(true);
    };

    const onClick = async () => {
        let actionMethod = 'POST';
        let id = 1;
      if(location.search) {
          actionMethod = 'PATCH'
          id = location.search.split('=')[1];
      }
      const res = await fetch('/api/posts/'+category, {
        method: actionMethod,
        body: JSON.stringify({
          title: title,
          content: draftToHtml(convertToRaw(content.editorState.getCurrentContent())),
          category: category,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await res.json()
      .then((res) => {
        if(res.status === 'ok') {
            console.log('asdg');
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
        console.log(editorState);
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