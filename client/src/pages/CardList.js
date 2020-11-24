import React, { useContext, useEffect, useState } from "react";
import { List } from "antd";
import { Button } from "react-bootstrap";
import {IsLoggedIn} from '../context/context'
import { Link } from "react-router-dom";
import callApiWithUseState, {makeSubTitle} from "../lib/callApi";

const CardList = (props) => {
  const {loggedIn} = useContext(IsLoggedIn);
  let titleData = '최신 글';
  const loc  = window.location.pathname;
  const [list, setList] = useState([]);
  const path = loc.substring(loc.lastIndexOf('/'))

  //componentDidMount
  useEffect(() => {
      console.log(path)
      if(path === '/') {
          callApiWithUseState(`/api/posts/recent`, setList);
      } else {
          callApiWithUseState(`/api/posts${path}`, setList);
      }
  }, [path]);

  
  return (
    <List
      itemLayout="vertical"
      size="large"
      style={{marginBottom: '1%'}}
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={list}
      header={
        <div>
          <h3>{titleData}</h3>
        </div>
      }
      footer={
        <div>
          {loggedIn ? <Link to="/write"><Button variant="outline-success">글쓰기</Button></Link> : ""}
        </div>
      }
      renderItem={(item) => (
        <List.Item key={item.id}>
          <List.Item.Meta 
            title={
            <>
            <Link to={`/view?num=${item.id}`}>
              <strong style={{fontSize: '18px'}}>{item.post_title}</strong>
            </Link>
            <div style={{textAlign: 'right'}}>{item.post_date.substring(0, 10)} | {item.user_id}</div>
            </>} />
          {makeSubTitle((item.post_content))}
        </List.Item>
      )}
    />
  );
};

export default CardList;
