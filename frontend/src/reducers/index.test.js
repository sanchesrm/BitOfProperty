import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import rootReducer from "./index";
import mockAxios from "axios";
import { ROOT_URL } from "../config";

describe("rootReducer Component", () => {
  beforeEach(() => {
    configure({ adapter: new Adapter() });
  });

  test("rootReducer", () => {
    expect.assertions(2);

    expect(rootReducer({}, { type: "SIGN_IN", payload: { data: {} } })).toEqual(
      { loggedUser: {}, users: [] }
    );

    expect(
      rootReducer({}, { type: "CLEAR_SIGN_IN", payload: { data: {} } })
    ).toEqual({ loggedUser: {}, users: [] });
  });
});
