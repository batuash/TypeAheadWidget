import React from "react";
import * as renderer from "react-test-renderer";
import { Body } from "../components";

it("renders correctly", () => {
  const component = renderer.create(<Body />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
