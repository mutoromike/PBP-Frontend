import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Dashboard from './components/dashboard/Dashboard'
import Home from "./components/home/Home";
import createHistory from "history/createBrowserHistory";

const history = createHistory();
function App() {
  return (
    <Router history={history}>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
