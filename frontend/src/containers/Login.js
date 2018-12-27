import React, { Component } from "react";
import { Form, Icon, Input, Button, Layout, message } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { signInUser } from "../actions/signinActions";
import "antd/dist/antd.css";
import logo from "../imgs/bitofproperty.png";

export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          loading: true
        });

        this.props
          .signInUser(values)
          .then(() => {
            this.props.history.push("/");
          })
          .catch(() => {
            message.error(
              "Something went wrong! Check your username or password!",
              3
            );
            this.setState({
              loading: false
            });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout.Content style={{ padding: "10% 40%" }}>
        <img src={logo} style={{ maxWidth: "300px" }} alt="" />

        <Form onSubmit={this.handleSubmit} style={{ maxWidth: "300px" }}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                {
                  type: "email",
                  message: "Username should be an e-mail!"
                },
                {
                  required: true,
                  message: "Please put your username"
                }
              ]
            })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={<Icon type="lock" />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              loading={this.state.loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    );
  }
}

export const WrappedLoginForm = Form.create()(LoginForm);

export const mapDispatchToProps = dispatch => {
  return bindActionCreators({ signInUser }, dispatch);
};

export default compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
)(WrappedLoginForm);
