import { shallowMount } from "@vue/test-utils";
import Header from "../Header";

describe("Header", () => {
  it("renders correct mode label in button", () => {
    // given
    const currentMode = "dark";

    // when
    const wrapper = shallowMount(Header, {
      stubs: [
        "toggleMode",
        "b-container",
        "b-navbar",
        "b-navbar-brand",
        "b-navbar-toggle",
        "b-nav-item",
        "b-icon",
        "b-button",
        "b-collapse",
        "b-navbar-nav"
      ],
      computed: { mode: () => currentMode }
    });

    const buttonText = wrapper.find("b-button-stub").text();

    // then
    expect(buttonText).toEqual("Light Mode");
  });
});
