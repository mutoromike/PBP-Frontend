import React from "react";
import { Link } from "react-router-dom";

const LoggedInMenu = ({ onLogout }) => (
  <ul className="nav navbar-nav navbar-center dropdown ">
    <li>
      <Link to="/home" className="page-scroll">
        Home
      </Link>
    </li>
    <li>
      <Link to="dashboard">Dashboard</Link>
    </li>
    <li>
      <Link to="/business" className="page-scroll">
        Business
      </Link>
    </li>
    <li>
      <Link
        to=""
        className="page-scroll dropdown-toggle"
        data-toggle="dropdown"
      >
        <i className="glyphicon glyphicon-user"></i>
      </Link>
      <ul className="dropdown-menu">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <a onClick={() => onLogout()}>Logout</a>
        </li>
      </ul>
    </li>
  </ul>
);

export default LoggedInMenu;
