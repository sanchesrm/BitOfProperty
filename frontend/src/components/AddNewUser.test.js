import Adapter from "enzyme-adapter-react-16";
import React from "react";
import toJson from "enzyme-to-json";
import { configure, mount } from "enzyme";
import { AddNewUserForm, AddNewUser, mapStateToProps } from "./AddNewUser";
import { Form } from "antd";

describe("AddNewUser Component", () => {
  let props;
  beforeEach(() => {
    configure({ adapter: new Adapter() });
    props = {
      createUser: jest.fn(() => Promise.resolve()),
      fetchUsers: jest.fn(() => Promise.resolve()),
      closeDrawer: jest.fn(),
      history: {
        push: jest.fn()
      }
    };
  });

  test("render correctly", () => {
    expect.assertions(1);

    const EnhancedForm = Form.create()(AddNewUserForm);
    const wrapper = mount(<EnhancedForm {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("should validate required fields", () => {
    expect.assertions(1);

    const EnhancedForm = Form.create()(AddNewUserForm);
    const wrapper = mount(<EnhancedForm {...props} />);

    const createUserMethod = jest.spyOn(props, "createUser");
    const AddNewUserWrapped = wrapper.wrap(wrapper.find(AddNewUser));

    AddNewUserWrapped.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(createUserMethod).not.toHaveBeenCalled();
  });

  test("should validate required fields and pass", () => {
    expect.assertions(3);

    const EnhancedForm = Form.create()(AddNewUserForm);
    const wrapper = mount(<EnhancedForm {...props} />);
    const AddNewUserWrapped = wrapper.wrap(wrapper.find(AddNewUser));

    const createUserMethod = jest.spyOn(props, "createUser");
    const fetchUsersMethod = jest.spyOn(props, "fetchUsers");
    const closeDrawerMethod = jest.spyOn(props, "closeDrawer");

    AddNewUserWrapped.find("input")
      .get(0)
      .props.onChange({
        target: { value: "bitofproperty@rocks.com" }
      });

    AddNewUserWrapped.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(createUserMethod).toHaveBeenCalled();
    props
      .createUser()
      .then(() => {
        expect(closeDrawerMethod).toHaveBeenCalled();
      })
      .then(() => {
        expect(fetchUsersMethod).toHaveBeenCalled();
      });
  });

  test("should validate required fields and fail to create", () => {
    expect.assertions(2);

    props = {
      ...props,
      createUser: jest.fn(() => Promise.reject())
    };

    const EnhancedForm = Form.create()(AddNewUserForm);
    const wrapper = mount(<EnhancedForm {...props} />);
    const AddNewUserWrapped = wrapper.wrap(wrapper.find(AddNewUser));

    const createUserMethod = jest.spyOn(props, "createUser");
    const closeDrawerMethod = jest.spyOn(props, "closeDrawer");

    AddNewUserWrapped.find("input")
      .get(0)
      .props.onChange({
        target: { value: "bitofproperty@rocks.com" }
      });

    AddNewUserWrapped.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(createUserMethod).toHaveBeenCalled();
    props.createUser().catch(() => {
      expect(closeDrawerMethod).not.toHaveBeenCalled();
    });
  });

  test("test mapStateToProps", () => {
    expect.assertions(1);

    const mapStateToPropsShallow = mapStateToProps({
      users: []
    });

    expect(mapStateToPropsShallow.users).toEqual([]);
  });
});
