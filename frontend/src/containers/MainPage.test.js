import Adapter from "enzyme-adapter-react-16";
import React from "react";
import toJson from "enzyme-to-json";
import { configure, shallow, mount } from "enzyme";
import { MainPage, mapStateToProps } from "./MainPage";

describe("MainPage Component", () => {
  let props;
  beforeEach(() => {
    configure({ adapter: new Adapter() });
    props = {
      users: null,
      loggedUser: {
        token: "1234"
      },
      fetchUsers: jest.fn(() => Promise.resolve()),
      deleteUser: jest.fn(() => Promise.resolve())
    };
  });

  test("render correctly", () => {
    expect.assertions(3);

    const mainPageShallow = shallow(<MainPage {...props} />);

    const fetchUsersMethod = jest.spyOn(props, "fetchUsers");

    expect(toJson(mainPageShallow)).toMatchSnapshot();
    expect(fetchUsersMethod).toHaveBeenCalled();
    props.fetchUsers().then(() => {
      expect(mainPageShallow.instance().state.loadingTable).toEqual(false);
    });
  });

  test("render correctly with elements on array", () => {
    expect.assertions(3);
    props = {
      ...props,
      users: [
        {
          _id: "1234",
          username: "bitofproperty@username.com",
          password: "asdf"
        }
      ]
    };

    const mainPageShallow = mount(<MainPage {...props} />);

    const fetchUsersMethod = jest.spyOn(props, "fetchUsers");

    expect(toJson(mainPageShallow)).toMatchSnapshot();
    expect(fetchUsersMethod).toHaveBeenCalled();
    props.fetchUsers().then(() => {
      expect(mainPageShallow.instance().state.loadingTable).toEqual(false);
    });
  });

  test("should delete successfully", () => {
    expect.assertions(3);

    const mainPageShallow = shallow(<MainPage {...props} />);

    const deleteUserMethod = jest.spyOn(props, "deleteUser");
    const fetchUsersMethod = jest.spyOn(props, "fetchUsers");
    mainPageShallow.instance().deleteUser("1234");

    expect(deleteUserMethod).toHaveBeenCalled();
    props.deleteUser().then(() => {
      expect(fetchUsersMethod).toHaveBeenCalled();
      expect(mainPageShallow.instance().state.loadingTable).toEqual(false);
    });
  });

  test("should delete successfully", () => {
    expect.assertions(2);
    props = {
      ...props,
      deleteUser: jest.fn(() => Promise.reject())
    };

    const mainPageShallow = shallow(<MainPage {...props} />);

    const deleteUserMethod = jest.spyOn(props, "deleteUser");
    mainPageShallow.instance().deleteUser("1234");

    expect(deleteUserMethod).toHaveBeenCalled();
    props.deleteUser().catch(() => {
      expect(mainPageShallow.instance().state.loadingTable).toEqual(false);
    });
  });

  test("should open and close modal", () => {
    expect.assertions(1);

    const mainPageShallow = shallow(<MainPage {...props} />);
    mainPageShallow.instance().setState({
      addNewUserPanel: true
    });
    mainPageShallow.instance().openCloseAddNewUserPanel();

    expect(mainPageShallow.instance().state.addNewUserPanel).toEqual(false);
  });

  test("should click to add a new user", () => {
    expect.assertions(1);

    const mainPageShallow = shallow(<MainPage {...props} />);

    mainPageShallow
      .find("#add-new-user-button")
      .get(0)
      .props.onClick();

    expect(mainPageShallow.instance().state.addNewUserPanel).toEqual(true);
  });

  test("test mapStateToProps", () => {
    expect.assertions(2);

    const mapStateToPropsShallow = mapStateToProps({
      users: [],
      loggedUser: { token: "1234 " }
    });

    expect(mapStateToPropsShallow.users).toEqual([]);
    expect(mapStateToPropsShallow.loggedUser).toEqual({ token: "1234 " });
  });
});
