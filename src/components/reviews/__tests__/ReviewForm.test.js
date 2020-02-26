import { mount } from "@vue/test-utils";
import ReviewForm from "../ReviewForm";
import { addReview } from "../../../services/reviews";

jest.mock("../../../services/reviews", () => ({
  addReview: jest.fn()
}));

const computed = {
  mode: () => "dark",
  user: () => ({ name: "Test User", email: "test@test" })
};

const createComponent = (config = {}) => {
  const componentConfig = {
    propsData: {
      sessionId: "session-id-1"
    },
    computed: { ...computed },
    ...config
  };

  return mount(ReviewForm, componentConfig);
};

describe("ReviewForm", () => {
  it("calls login with provided review data", () => {
    const wrapper = createComponent({
      mocks: {
        $v: {
          $touch: () => true,
          $reset: () => null,
          $invalid: false,
          form: {
            rating: {},
            comment: {}
          }
        }
      }
    });

    wrapper.vm.form.rating = 4;
    wrapper.find("#input-comment").setValue("my comment");

    wrapper.find("button").trigger("submit");

    expect(addReview).toHaveBeenCalledWith("session-id-1", 4, "my comment");
  });
});
