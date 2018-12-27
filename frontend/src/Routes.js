import React from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./containers/Login";
import MainPage from "./containers/MainPage";
import { bindActionCreators } from "redux";
import { logout } from "./actions/signinActions";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import logo from "./imgs/bitofproperty.png";

const { Header, Content } = Layout;

const Routes = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        {props.loggedUser.token ? (
          <div>
            <Header>
              <img
                style={{
                  width: "270px",
                  float: "left",
                  marginLeft: "150px",
                  marginTop: "2px"
                }}
                src={logo}
                alt=""
              />
              <Menu
                theme="dark"
                mode="horizontal"
                style={{ lineHeight: "64px" }}
              >
                <Menu.Item
                  key="1"
                  style={{
                    float: "right",
                    marginRight: "150px",
                    fontSize: "18px"
                  }}
                  onClick={() => props.logout()}
                >
                  Logout
                </Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: "50px 20%" }}>
              <Switch>
                <Route path="/" component={MainPage} />
              </Switch>
            </Content>
          </div>
        ) : (
          <Redirect to="/login" />
        )}
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
  loggedUser: state.loggedUser
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
