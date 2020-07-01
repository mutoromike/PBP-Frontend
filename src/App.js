import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const App = () => (
  <Router history={history}>
    <div>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  </Router>
);

export default App;
