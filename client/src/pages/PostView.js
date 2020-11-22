import React, { useContext, useEffect, useState } from 'react';
import {Typography, Divider} from 'antd';
import {Button } from 'react-bootstrap';
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {IsLoggedIn} from '../context/context'
import callApi from '../lib/callApi';
import { useLocation, Link } from 'react-router-dom';
const {Title, Paragraph, Text} = Typography;

const PostView = (props) => {
    const {loggedIn} = useContext(IsLoggedIn);
    const [post, setPost] = useState({});
    let location = useLocation();
    useEffect(()=> {
      callApi(`/api/posts/view?id=${location.search.split('=')[1]}`, setPost);
    }, [location.search])
    return (
        <Typography>
    <Title>{post.post_title}</Title>
    <Divider />
    <Paragraph>
      <div dangerouslySetInnerHTML={{__html: post.post_content}}></div>
    </Paragraph>
    <Divider />
    <div style={{marginBottom: '1%'}}>
    {loggedIn ? (
        <div>
            <Link to="/write?"><Button>수정</Button></Link>
            <Button style={{marginLeft:'1%'}}
                
            >삭제</Button>
        </div>
        ) : ("")
    }
    </div>
    <Divider />
    <a href={`/view?category=${''}&post-no=${''}`}><ArrowUpOutlined/> 이전 글 : {`노드 제이에스는 재밋냐?`}</a>
    <Divider style={{border: '1px solid gray'}}/>
    <a href={`/view?category=${''}&post-no=${''}`}><ArrowDownOutlined/> 다음 글 : {`노드 제이에스는 재밋냐?`}</a>
  </Typography>
  
    );
};

export default PostView;