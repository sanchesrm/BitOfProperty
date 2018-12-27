import React, { Component, Fragment } from "react";
import { Form, Button, Col, Row, Input, message } from "antd";
import { createUser, fetchUsers } from "../actions/userActions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

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
        this.setState({
          addingUserLoading: true
        });

        this.props
          .createUser(values.email)
          .then(() => {
            form.resetFields();
            closeDrawer();
          })
          .then(() => {
            this.props.fetchUsers();
          })
          .catch(() => {
            message.error("Something went wrong!", 2.5);
          })
          .finally(() => {
            this.setState({
              addingUserLoading: false
            });
          });
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

function mapStateToProps({ users }) {
  return { users };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createUser, fetchUsers }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNewUserForm);
