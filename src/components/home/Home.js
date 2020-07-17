import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";

const Home = () => {
  return (
    <div>
      <header>
        <div className="header-content">
          <div className="header-content-inner">
            <h1 className="heading"> Business Manager </h1>
            <hr />
            <p>Platform to manage your business financials</p>
            <p>
              <Link to="register"> Register Today!</Link> Focus on your
              business. We focus on your operations.
            </p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
