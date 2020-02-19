import { shallowMount } from "@vue/test-utils";
import Header from "../Header";

describe("Header", () => {
  it("renders correct mode label in button", () => {
    // given
    const currentMode = "dark";

    // when
    const wrapper = shallowMount(Header, {
      computed: { mode: () => currentMode }
    });

    const buttonText = wrapper.find("b-button-stub").text();

    // then
    expect(buttonText).toEqual("Light Mode");
  });
});
