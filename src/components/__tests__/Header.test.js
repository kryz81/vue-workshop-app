import { shallowMount, mount } from "@vue/test-utils";
import Header from "../Header";

describe("Header", () => {
  it("renders correct mode label in button", () => {
    // given
    const currentMode = "dark";

    // when
    const wrapper = shallowMount(Header, {
      computed: { mode: () => currentMode }
    });

    const buttonText = wrapper.find(".toggle-mode").text();

    // then
    expect(buttonText).toEqual("Light Mode");
  });

  it("calls toggleMode on button click", () => {
    // given
    const toggleModeMock = jest.fn();

    const wrapper = mount(Header, {
      computed: { mode: () => "dark" },
      methods: {
        toggleMode: toggleModeMock
      }
    });

    // when
    wrapper.find(".toggle-mode").trigger("click");

    // then
    expect(toggleModeMock).toHaveBeenCalled();
  });
});
