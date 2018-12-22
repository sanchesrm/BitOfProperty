import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import MainPage from "./containers/MainPage";
import { Layout } from "antd";
import "antd/dist/antd.css";

const { Header, Content } = Layout;

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact component={Login} />
      <div>
        <Header />
        <Content style={{ padding: "50px 20%" }}>
          <Switch>
            <Route path="/" component={MainPage} />
          </Switch>
        </Content>
      </div>
    </Switch>
  </BrowserRouter>
);

export default Routes;
