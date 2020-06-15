import React from "react";
import { withStyle } from "../hoc";
import { Body } from "../components";

const App: React.FunctionComponent<{}> = () => (
  <div className="appContainer">
    <Body />
  </div>
);

const style = `
	.appContainer {
	    display: flex;
	    justify-content: center;
	    background-color: lightskyblue;
      height: 100vh;
	}
`;

export default withStyle(style)(App);
