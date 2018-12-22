import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Table, Icon, message, Button, Row, Popconfirm, Drawer } from "antd";
import AddNewUser from "../components/AddNewUser";

const data = [
  {
    id: "1",
    username: "John Brown",
    password: "New York No. 1 Lake Park"
  },
  {
    id: "2",
    username: "Jim Green",
    password: "London No. 1 Lake Park"
  },
  {
    id: "3",
    username: "Joe Black",
    password: "Sidney No. 1 Lake Park"
  }
];

class mainPage extends Component {
  constructor() {
    super();

    this.state = {
      loadingTable: false,
      addNewUserPanel: false
    };
  }

  getColumns = () => {
    return [
      {
        title: "ID",
        dataIndex: "id",
        key: "id"
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username"
      },
      {
        title: "Password",
        dataIndex: "password",
        key: "password"
      },
      {
        title: "",
        key: "id",
        render: (text, record) => (
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            placement="leftBottom"
            onConfirm={() => this.deleteUser(record.id)}
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
    setTimeout(() => {
      message.success("User was deleted", 2.5);
      this.setState({
        loadingTable: true
      });

      setTimeout(() => {
        this.setState({
          loadingTable: false
        });
      }, 3000);
    }, 3000);
  };

  openCloseAddNewUserPanel = () => {
    this.setState({
      addNewUserPanel: !this.state.addNewUserPanel
    });
  };

  render() {
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
          dataSource={data}
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

export default withRouter(mainPage);
