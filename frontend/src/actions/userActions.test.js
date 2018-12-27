import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
import {
  USER_ACTIONS,
  createUser,
  fetchUsers,
  deleteUser
} from "./userActions";
import mockAxios from "axios";
import { ROOT_URL } from "../config";

describe("signinActions Component", () => {
  let props;
  beforeEach(() => {
    configure({ adapter: new Adapter() });
  });

  test("call createUser correctly", () => {
    expect.assertions(2);

    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {}
      })
    );

    const createUserReturn = createUser("asdf");

    expect(mockAxios.post).toHaveBeenCalledWith(`${ROOT_URL}/createUser`, {
      username: "asdf"
    });
    const { type } = createUserReturn;
    expect(type).toEqual(USER_ACTIONS.CREATE_USER);
  });

  test("call fetchUsers correctly", () => {
    expect.assertions(2);

    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: []
      })
    );

    const fetchUsersReturn = fetchUsers();

    expect(mockAxios.get).toHaveBeenCalledWith(`${ROOT_URL}/fetchUsers`);
    const { type } = fetchUsersReturn;
    expect(type).toEqual(USER_ACTIONS.FETCH_USERS);
  });

  test("call deleteUser correctly", () => {
    expect.assertions(2);

    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({
        data: []
      })
    );

    const deleteUserReturn = deleteUser("1234");

    expect(mockAxios.delete).toHaveBeenCalledWith(
      `${ROOT_URL}/deleteUser/1234`
    );
    const { type } = deleteUserReturn;
    expect(type).toEqual(USER_ACTIONS.DELETE_USER);
  });
});
