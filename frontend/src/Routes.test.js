import Adapter from "enzyme-adapter-react-16";
import React from "react";
import toJson from "enzyme-to-json";
import { configure, shallow } from "enzyme";
import { Routes } from "./Routes";

describe("Routes Component", () => {
  let props;
  beforeEach(() => {
    configure({ adapter: new Adapter() });
    props = { loggedUser: [] };
  });

  test("render correctly", () => {
    expect.assertions(1);

    const wrapper = shallow(<Routes {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test("render correctly when token", () => {
    expect.assertions(1);

    props = {
      ...props,
      loggedUser: {
        token: "1234"
      }
    };

    const wrapper = shallow(<Routes {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
