import { mount } from "@vue/test-utils";
import LoginForm from "../LoginForm";
import { login } from "../../../services/login";
import flushPromises from "flush-promises";

jest.mock("../../../services/login", () => ({
  login: jest.fn((email, password) =>
    Promise.resolve({
      id: "1",
      name: "Test User",
      email: email,
      password: password,
      plannedSessions: []
    })
  )
}));

const computed = {
  mode: () => "dark",
  user: () => ({ name: "Test User", email: "test@test" })
};

const createComponent = (config = {}) => {
  const componentConfig = {
    stubs: ["router-link"],
    mocks: {
      $router: {
        push: () => null
      }
    },
    computed: { ...computed },
    methods: {
      setUser: () => null
    },
    ...config
  };

  return mount(LoginForm, componentConfig);
};

describe("LoginForm", () => {
  it("calls login service with provided credentials", () => {
    const wrapper = createComponent();

    const emailInput = wrapper.find("#input-email");
    emailInput.setValue("user@email");

    const passwordInput = wrapper.find("#input-password");
    passwordInput.setValue("pass");

    wrapper.find("button").trigger("submit");

    expect(login).toHaveBeenCalledWith("user@email", "pass");
  });

  it("show error message on login error", async () => {
    login.mockResolvedValue(null);
    const wrapper = createComponent();

    wrapper.find("#input-email").setValue("user@email");
    wrapper.find("#input-password").setValue("pass");

    wrapper.find("form").trigger("submit");

    await flushPromises();

    expect(wrapper.find(".login-error").text()).toEqual("Invalid credentials");
  });
});
