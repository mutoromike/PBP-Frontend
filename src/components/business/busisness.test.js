import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import Business from "./Business";

const business = {
  name: "",
  countries: [],
};
describe("Business", () => {
  it("loads the business page", () => {
    const wrapper = shallow(<Business />);
    expect(wrapper).toBeDefined();
  });
});
