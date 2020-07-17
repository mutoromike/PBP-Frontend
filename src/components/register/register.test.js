import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { shallow } from "enzyme";
import Register from "./Register";

describe("Register", () => {
  it("component renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });

  it("should have `bootstrap-icons`", () => {
    const wrapper = shallow(<Register />);
    expect(
      wrapper.contains(
        <span className="input-group-addon">
          <i className="glyphicon glyphicon-envelope"></i>
        </span>
      )
    ).toBe(true);
  });

  it("should have an `input` element", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper.containsMatchingElement(<input />)).toBe(true);
  });

  it("should have a `Reg` button", () => {
    const wrapper = shallow(<Register />);
    expect(
      wrapper.containsMatchingElement(
        <input className="form-control btn btn-primary" value="Register Now" />
      )
    ).toBe(true);
  });
});
