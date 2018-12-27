import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import { CLEAR_SIGN_IN, signInUser, logout } from "./signinActions";
import mockAxios from "axios";
import { ROOT_URL } from "../config";

describe("signinActions Component", () => {
  let props;
  beforeEach(() => {
    configure({ adapter: new Adapter() });
  });

  test("call signInUser correctly", () => {
    expect.assertions(1);

    mockAxios.put.mockImplementationOnce(() =>
      Promise.resolve({
        data: [{ _id: "1234" }]
      })
    );

    signInUser({ email: "asdf", password: "fdsa" });

    expect(mockAxios.put).toHaveBeenCalledWith(`${ROOT_URL}/signin`, {
      email: "asdf",
      password: "fdsa"
    });
  });

  test("call signInUser correctly", () => {
    expect.assertions(1);

    const logOut = logout();

    expect(logOut).toEqual({ type: CLEAR_SIGN_IN, payload: {} });
  });
});
