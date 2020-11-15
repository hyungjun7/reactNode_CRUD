import React, { useContext } from "react";
import { List } from "antd";
import { Button } from "react-bootstrap";
import {IsLoggedIn} from '../context/context'

const CardList = (props) => {
  const {loggedIn} = useContext(IsLoggedIn);
  let titleData = '최신 글';
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      post_no: `${i}`,
      href: "https://ant.design",
      title: `노드 재밋다 ${i}`,
      content:
        "노드는 재밋고 리액트도 재밋는데 타입스크립트 배우고 싶다",
      date: '1234',
      user_id: 'step7'
    });
  }
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
      dataSource={listData}
      header={
        <div>
          <h3>{titleData}</h3>
        </div>
      }
      footer={
        <div>
          {loggedIn ? <Button variant="outline-success" href="/write">글쓰기</Button> : ""}
        </div>
      }
      renderItem={(item) => (
        <List.Item key={item.post_no}>
          <List.Item.Meta 
            title={
            <>
            <a href={`/view?category=${item.category}&post-no=${item.post_no}`}>
              <strong style={{fontSize: '18px'}}>{item.title}</strong>
            </a>
            <div style={{textAlign: 'right'}}>{item.date} | {item.user_id}</div>
            </>} />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default CardList;
