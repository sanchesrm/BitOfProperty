import Adapter from "enzyme-adapter-react-16";
import React from "react";
import toJson from "enzyme-to-json";
import { configure, mount } from "enzyme";
import { LoginForm, WrappedLoginForm } from "./Login";
import { Form } from "antd";

describe("Login Component", () => {
  let props;
  beforeEach(() => {
    configure({ adapter: new Adapter() });
    props = {
      signInUser: jest.fn(() => Promise.resolve()),
      history: {
        push: jest.fn()
      }
    };
  });

  test("render correctly", () => {
    expect.assertions(1);

    const EnhancedForm = Form.create()(WrappedLoginForm);
    const wrapper = mount(<EnhancedForm {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("should validate required fields", () => {
    expect.assertions(1);

    const EnhancedForm = Form.create()(WrappedLoginForm);
    const wrapper = mount(<EnhancedForm {...props} />);

    const signInUserMethod = jest.spyOn(props, "signInUser");
    const loginWrapped = wrapper.wrap(wrapper.find(LoginForm));

    loginWrapped.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(signInUserMethod).not.toHaveBeenCalled();
  });

  test("should validate required fields", () => {
    expect.assertions(2);

    const EnhancedForm = Form.create()(WrappedLoginForm);
    const wrapper = mount(<EnhancedForm {...props} />);
    const loginWrapped = wrapper.wrap(wrapper.find(LoginForm));

    loginWrapped
      .find("input")
      .get(0)
      .props.onChange({
        target: { value: "bitofproperty@rocks.com" }
      });
    loginWrapped
      .find("input")
      .get(1)
      .props.onChange({
        target: { value: "bitofproperty@rocks.com" }
      });

    const signInUserMethod = jest.spyOn(props, "signInUser");
    const pushMethod = jest.spyOn(props.history, "push");

    loginWrapped.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(signInUserMethod).toHaveBeenCalled();
    props.signInUser({}).then(() => {
      expect(pushMethod).toHaveBeenCalledWith("/");
    });
  });

  test("should validate required fields but fail on signin", () => {
    expect.assertions(3);
    props = {
      ...props,
      signInUser: jest.fn(() => Promise.reject())
    };

    const EnhancedForm = Form.create()(WrappedLoginForm);
    const wrapper = mount(<EnhancedForm {...props} />);
    const loginWrapped = wrapper.wrap(wrapper.find(LoginForm));

    loginWrapped
      .find("input")
      .get(0)
      .props.onChange({
        target: { value: "bitofproperty@rocks.com" }
      });
    loginWrapped
      .find("input")
      .get(1)
      .props.onChange({
        target: { value: "bitofproperty@rocks.com" }
      });

    const signInUserMethod = jest.spyOn(props, "signInUser");
    const pushMethod = jest.spyOn(props.history, "push");

    loginWrapped.instance().handleSubmit({ preventDefault: jest.fn() });
    expect(signInUserMethod).toHaveBeenCalled();
    props.signInUser({}).catch(() => {
      expect(pushMethod).not.toHaveBeenCalled();
      expect(loginWrapped.instance().state.loading).toEqual(false);
    });
  });
});
