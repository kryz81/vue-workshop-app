import { shallowMount } from "@vue/test-utils";
import App from "../App";

describe("App", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(App, {
      stubs: ["router-view"],
      computed: { mode: () => "dark", errorMessage: () => "" }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
