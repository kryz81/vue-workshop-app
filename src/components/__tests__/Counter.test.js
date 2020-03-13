import Vue from "vue";
import { mount } from "@vue/test-utils";
import Counter from "../Counter";

it("renders the initial value", async () => {
  const cmp = mount(Counter, { propsData: { initial: 5, max: 10 } });

  await Vue.nextTick();

  expect(cmp.find("span").text()).toEqual("Counter: 5");
});

it("uses default value when no initial value has been provided", async () => {
  const cmp = mount(Counter, { propsData: { max: 10 } });

  expect(cmp.find("span").text()).toEqual("Counter: 0");
});

it("uses default value when no initial value has been provided", async () => {
  const cmp = mount(Counter, { propsData: { initial: 2, max: 10 } });

  const btn = cmp.find("button");
  btn.trigger("click");
  btn.trigger("click");

  await Vue.nextTick();

  expect(cmp.find("span").text()).toEqual("Counter: 4");
});

it("does not increase when max value reached", async () => {
  const cmp = mount(Counter, { propsData: { initial: 1, max: 3 } });

  const btn = cmp.find("button");
  btn.trigger("click");
  btn.trigger("click");
  btn.trigger("click");
  btn.trigger("click");

  await Vue.nextTick();

  expect(cmp.find("span").text()).toEqual("Counter: 3");
});

it("emitted an event with the updated counter value", () => {
  const cmp = mount(Counter, { propsData: { initial: 2, max: 10 } });

  const btn = cmp.find("button");
  btn.trigger("click");
  btn.trigger("click");

  expect(cmp.emitted().counterIncrease[1]).toEqual([4]);
});
