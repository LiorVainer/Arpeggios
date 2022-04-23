import axios from "axios";

import { User, UserWithId } from "../../../types/user";
import forest, { ForestInstance, ForestService, ForestServiceConfig } from "../../../../src";

export const forestInstance: ForestInstance = forest.create();
export let userService: UserService;

export class UserService extends ForestService<UserWithId, User> {
  constructor(config?: ForestServiceConfig) {
    super("user", forestInstance, config);
  }

  public getByName = this.methods.getByParam<UserWithId, string>("name");
  public isEmailTaken = this.methods.getByParam<boolean, string>(["email", "taken"]);
}

export const Authorization = "Bearer 123";

beforeAll(() => {
  userService = new UserService({
    onSuccess: (response) => response.data,
    requestConfig: { headers: { Authorization } },
  });
});

describe("Forest Classes", () => {
  test("Forest Instance Defined", () => {
    expect(forestInstance).toBeDefined();
  });

  test("Forest Service Defined", () => {
    expect(userService).toBeDefined();
  });
});
