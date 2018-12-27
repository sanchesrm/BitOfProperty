import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Table, Icon, message, Button, Row, Popconfirm, Drawer } from "antd";
import AddNewUser from "../components/AddNewUser";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { fetchUsers, deleteUser } from "../actions/userActions";
import axios from "axios";

class mainPage extends Component {
  constructor(props) {
    super(props);

    axios.defaults.headers.common[
      "Authorization"
    ] = this.props.loggedUser.token;

    this.state = {
      loadingTable: true,
      addNewUserPanel: false
    };
  }

  componentDidMount() {
    this.props.fetchUsers().finally(() => {
      this.setState({
        loadingTable: false
      });
    });
  }

  getColumns = () => {
    return [
      {
        title: "ID",
        dataIndex: "_id",
        key: "id",
        width: "300px"
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: "350px"
      },
      {
        title: "Password",
        dataIndex: "password",
        key: "password"
      },
      {
        title: "",
        key: "deleteUser",
        render: (text, record) => (
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            placement="leftBottom"
            onConfirm={() => this.deleteUser(record._id)}
          >
            <Icon style={{ fontSize: "20px" }} type="delete" />
          </Popconfirm>
        ),
        width: "50px"
      }
    ];
  };

  deleteUser = userId => {
    message.loading("Deleting user..", 2.5);
    this.setState({
      loadingTable: true
    });

    this.props
      .deleteUser(userId)
      .then(() => {
        message.destroy();
        message.success("User was deleted", 2.5);
        this.props.fetchUsers();
      })
      .catch(() => {
        message.destroy();
        message.error("Something went wrong!", 2.5);
      })
      .finally(() => {
        this.setState({
          loadingTable: false
        });
      });
  };

  openCloseAddNewUserPanel = () => {
    this.setState({
      addNewUserPanel: !this.state.addNewUserPanel
    });
  };

  render() {
    const users = this.props.users;
    return (
      <Fragment>
        <Row type="flex" justify="end">
          <Button
            type="primary"
            size="large"
            onClick={() => {
              this.setState({
                addNewUserPanel: true
              });
            }}
          >
            <Icon type="plus" />
            Add New User
          </Button>
        </Row>
        <Table
          style={{ cursor: "pointer", marginTop: "25px" }}
          columns={this.getColumns()}
          dataSource={users ? users.data : []}
          loading={this.state.loadingTable}
        />
        <Drawer
          title="Create a new user"
          width={500}
          visible={this.state.addNewUserPanel}
          onClose={this.openCloseAddNewUserPanel}
          style={{
            overflow: "auto",
            height: "calc(100% - 150px)",
            paddingBottom: "150px"
          }}
        >
          <AddNewUser closeDrawer={this.openCloseAddNewUserPanel} />
        </Drawer>
      </Fragment>
    );
  }
}

function mapStateToProps({ users, loggedUser }) {
  return { users, loggedUser };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchUsers, deleteUser }, dispatch);
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(mainPage);
