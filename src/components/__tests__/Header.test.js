import { shallowMount, mount } from "@vue/test-utils";
import Header from "../Header";

const computed = {
  mode: () => "dark",
  user: () => ({ name: "Test User", email: "test@test" })
};

const createComponent = (shallow = true, config = {}) => {
  const componentConfig = {
    stubs: ["router-link"],
    mocks: {
      $router: {
        push: () => null
      }
    },
    computed: { ...computed },
    ...config
  };

  return shallow
    ? shallowMount(Header, componentConfig)
    : mount(Header, componentConfig);
};

describe("Header", () => {
  it("renders correct mode label in button", () => {
    const wrapper = createComponent();
    const buttonText = wrapper.find(".toggle-mode").text();

    expect(buttonText).toEqual("Light Mode");
  });

  it("renders login link when user not logged in", () => {
    const wrapper = createComponent(true, {
      computed: {
        ...computed,
        user: () => null
      }
    });

    expect(wrapper.html()).toContain("Login");
  });

  it("renders logout link when user logged in", () => {
    const wrapper = createComponent();

    expect(wrapper.html()).toContain("Logout");
  });

  it("renders profile link with name when user logged in", () => {
    const wrapper = createComponent();

    expect(wrapper.html()).toContain("Test User");
  });

  it("logs out user", () => {
    const setUserMock = jest.fn();
    const wrapper = createComponent(false, {
      methods: {
        setUser: setUserMock
      }
    });

    wrapper.find(".logout .nav-link").trigger("click");

    expect(setUserMock).toHaveBeenCalledWith(null);
  });

  it("calls toggleMode on mode button click", () => {
    const toggleModeMock = jest.fn();
    const wrapper = createComponent(false, {
      methods: {
        toggleMode: toggleModeMock
      }
    });

    wrapper.find(".toggle-mode").trigger("click");

    expect(toggleModeMock).toHaveBeenCalled();
  });
});
