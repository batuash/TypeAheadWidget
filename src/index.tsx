import React from "react";
import { render } from "react-dom";
import { App } from "./components";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

render(
  <Router>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
