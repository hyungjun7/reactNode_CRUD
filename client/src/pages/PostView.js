import React, { useContext, useEffect, useState } from 'react';
import {Typography, Divider} from 'antd';
import {Button } from 'react-bootstrap';
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {IsLoggedIn} from '../context/context'
import callApiWithUseState from '../lib/callApi';
import { useLocation, Link } from 'react-router-dom';
const {Title, Paragraph, Text} = Typography;

const PostView = (props) => {
    const {loggedIn} = useContext(IsLoggedIn);
    const [post, setPost] = useState({});
    let location = useLocation();
    useEffect(()=> {
      callApiWithUseState(`/api/posts/view?id=${location.search.split('=')[1]}`, setPost);
    }, [location.search])
    return (
        <Typography>
    <Title>{post.post_title}</Title>
    <Divider />
    <Paragraph>
      {/** XSS (크로스 사이트 스크립팅)의 위험이 있다고 한다. */}
      <div dangerouslySetInnerHTML={{__html: post.post_content}}></div>
    </Paragraph>
    <Divider />
    <div style={{marginBottom: '1%'}}>
    {loggedIn && (
        <div>
            <Link to={`/write?id=${post.id}`}><Button>수정</Button></Link>
            <Button style={{marginLeft:'1%'}}>숨김</Button>
        </div>
    )}
    </div>
    {/** 임시 데이터, Link 태그 안쓰면 상태값 날아가니 조심 */}
    <Divider />
    <Link to={`/view?id=${''}`}><ArrowUpOutlined/> 이전 글 : {`노드 제이에스는 재미있는가?`}</Link>
    <Divider style={{border: '1px solid gray'}}/>
    <Link to={`/view?id=${''}`}><ArrowDownOutlined/> 다음 글 : {`스프링과 노드 그것이 문제로다`}</Link>
  </Typography>
  
    );
};

export default PostView;
