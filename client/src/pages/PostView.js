import React, { useContext, useEffect, useState } from 'react';
import {Typography, Divider} from 'antd';
import {Button } from 'react-bootstrap';
import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {IsLoggedIn} from '../context/context'
import callApi from '../lib/callApi';
const {Title, Paragraph, Text, Link} = Typography;




const PostView = (props) => {
    const {loggedIn} = useContext(IsLoggedIn);
    const [post, setPost] = useState({});
    
    useEffect(()=> {
      callApi(`/api/posts/view?id=`, setPost);
    }, [])
    return (
        <Typography>
    <Title>{post.post_title}</Title>
    <Divider />
    <Title>介绍</Title>
    <Paragraph>
      蚂蚁的企业级产品是一个庞大且复杂的体系。这类产品不仅量级巨大且功能复杂，而且变动和并发频繁，常常需要设计与开发能够快速的做出响应。同时这类产品中有存在很多类似的页面以及组件，可以通过抽象得到一些稳定且高复用性的内容。
    </Paragraph>
    <Paragraph>
      随着商业化的趋势，越来越多的企业级产品对更好的用户体验有了进一步的要求。带着这样的一个终极目标，我们（蚂蚁金服体验技术部）经过大量的项目实践和总结，逐步打磨出一个服务于企业级产品的设计体系
      Ant Design。基于<Text mark>『确定』和『自然』</Text>
      的设计价值观，通过模块化的解决方案，降低冗余的生产成本，让设计者专注于
      <Text strong>更好的用户体验</Text>。
    </Paragraph>
    <Title level={2}>设计资源</Title>
    <Paragraph>
      我们提供完善的设计原则、最佳实践和设计资源文件（<Text code>Sketch</Text> 和
      <Text code>Axure</Text>），来帮助业务快速设计出高质量的产品原型。
    </Paragraph>

    <Paragraph>
      <ul>
        <li>
          <Link href="/docs/spec/proximity">设计原则</Link>
        </li>
        <li>
          <Link href="/docs/pattern/navigation">设计模式</Link>
        </li>
        <li>
          <Link href="/docs/resource/download">设计资源</Link>
        </li>
      </ul>
    </Paragraph>

    <Paragraph>
      <blockquote>gsdg</blockquote>
      <pre>aasd</pre>
    </Paragraph>

    <Paragraph>
      按<Text keyboard>Esc</Text>键退出阅读……
    </Paragraph>
    <Divider />
    <div style={{marginBottom: '1%'}}>
    {loggedIn ? (
        <div>
            <Button>수정</Button> 
            <Button style={{marginLeft:'1%'}}
                href={`/view?category=${''}&post-no=${''}`}
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