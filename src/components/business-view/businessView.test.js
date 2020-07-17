import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import BusinessView from "./BusinessView";

const business = {
  name: "",
  countries: [],
};
describe("BusinessView", () => {
  it("component render without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <BusinessView business={business} />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });
});
