import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import "./App.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const App = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
      </Switch>
    </div>
  </Router>
);

export default App;
