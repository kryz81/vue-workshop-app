import { mount } from "@vue/test-utils";
import flushPromises from "flush-promises";
import Session from "../SessionDetails";

jest.mock("../../../services/sessions");

describe("Session", () => {
  it("renders correctly", async () => {
    // when
    const wrapper = mount(Session, {
      stubs: ["router-view", "router-link"],
      propsData: { id: "12345" }
    });

    await flushPromises();

    // then
    expect(wrapper.html()).toMatchSnapshot();
    expect(wrapper.props("id")).toEqual("12345");
  });
});
