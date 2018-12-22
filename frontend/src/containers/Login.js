import React, { Component } from "react";
import { Form, Icon, Input, Button, Layout } from "antd";
import { withRouter } from "react-router-dom";
import "antd/dist/antd.css";

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.history.push("/");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout.Content style={{ padding: "10% 40%" }}>
        <Form onSubmit={this.handleSubmit} style={{ maxWidth: "300px" }}>
          <Form.Item>
            {getFieldDecorator("userName", {
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
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Layout.Content>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default withRouter(WrappedLoginForm);
