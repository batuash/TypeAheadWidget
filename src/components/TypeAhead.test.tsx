import React from "react";
import * as renderer from "react-test-renderer";
import { TypeAhead } from "../components";

it("renders correctly", () => {
  const component = renderer.create(<TypeAhead />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
