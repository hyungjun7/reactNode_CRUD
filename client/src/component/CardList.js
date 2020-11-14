import React from "react";
import { List } from "antd";
import { Button } from "react-bootstrap";

const CardList = ({ isLoggedIn, titleData }) => {
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: "https://ant.design",
      title: `ant design part ${i}`,
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    });
  }
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      dataSource={listData}
      header={
        <div>
          <h3>{titleData}</h3>
        </div>
      }
      footer={
        <div>
          {isLoggedIn ? <Button variant="outline-success">글쓰기</Button> : ""}
        </div>
      }
      renderItem={(item) => (
        <List.Item key={item.title}>
          <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
          {item.content}
        </List.Item>
      )}
    />
  );
};

export default CardList;
