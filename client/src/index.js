import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { BrowserRouter } from "react-router-dom";
import LoginState from './context/LoginState';
import 'draft-js-image-plugin/lib/plugin.css';

ReactDOM.render(
  //리액트에서 리덕스를 사용하기 위해 Provider로 감싸주고 props로 store를 넘겨줌
  <LoginState>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </LoginState>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
