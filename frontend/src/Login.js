import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Form, Icon, Input, Button, Layout } from "antd";
import "antd/dist/antd.css";
import { withRouter } from "react-router-dom";

const { Content } = Layout;
const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.history.push("/mainPage");
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Content style={{ padding: "10% 40%" }}>
        <Form onSubmit={this.handleSubmit} style={{ maxWidth: "300px" }}>
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "Please input your username!" }]
            })(<Input prefix={<Icon type="user" />} placeholder="Username" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "Please input your Password!" }]
            })(<Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />)}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Log in
            </Button>
          </FormItem>
        </Form>
      </Content>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

export default withRouter(WrappedLoginForm);
