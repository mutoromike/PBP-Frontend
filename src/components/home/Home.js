import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';


class Home extends Component {
  render() {
    return (
            <header>
                <div className="header-content">
                    <div className="header-content-inner">
                        <h1 className="heading"> Bright Events </h1>
                        <hr />
                        <p>Platform to create and manage different types of events.
                        <br />
                            <Link to="/events">RSVP </Link>to events.
                        </p>
                        <p>Organizing for events? <Link to="register"> Register </Link> today.
                        </p>

                    </div>

                </div>
            </header>

    );
  }
}

export default Home;