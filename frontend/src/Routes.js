import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login";
import mainPage from "./mainPage";
import { Layout } from "antd";
import "antd/dist/antd.css";

const { Header, Content } = Layout;

const Routes = () => (
  <BrowserRouter>
    <main>
      <Route path="/login" exact component={Login} />
      <Header>
        <Content>
          <Route path="/" component={mainPage} />
        </Content>
      </Header>
    </main>
  </BrowserRouter>
);

export default Routes;
