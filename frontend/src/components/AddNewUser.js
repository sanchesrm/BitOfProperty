import React, { Component, Fragment } from "react";
import { Form, Button, Col, Row, Input } from "antd";

class AddNewUser extends Component {
  constructor() {
    super();

    this.state = {
      addingUserLoading: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, closeDrawer } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        this.setState({
          addingUserLoading: true
        });

        setTimeout(() => {
          this.setState({
            addingUserLoading: false
          });

          form.resetFields();
          closeDrawer();
        }, 3000);
      }
    });
  };

  render() {
    const {
      closeDrawer,
      form: { getFieldDecorator }
    } = this.props;

    return (
      <Fragment>
        <Form onSubmit={this.handleSubmit} layout="vertical" hideRequiredMark>
          <Row>
            <Col>
              <Form.Item label="Username">
                {getFieldDecorator("email", {
                  rules: [
                    {
                      type: "email",
                      message: "Username should be an e-mail!"
                    },
                    {
                      required: true,
                      message: "Please enter username"
                    }
                  ]
                })(<Input placeholder="Please enter username" />)}
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.state.addingUserLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Fragment>
    );
  }
}

const AddNewUserForm = Form.create()(AddNewUser);

export default AddNewUserForm;
