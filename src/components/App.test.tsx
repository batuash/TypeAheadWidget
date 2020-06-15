import React from 'react'
import * as renderer from 'react-test-renderer'
import { App } from '../components';

it("renders correctly", () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
