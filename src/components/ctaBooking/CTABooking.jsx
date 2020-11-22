import React, { Component } from "react";
import { Link } from "react-router-dom";

// CSS
import "./CTABooking.css";

class CTABooking extends Component {
  render() {
    return (
      <div className="CTABooking_container">
        <div className="CTABooking_title">
          <h1>BOOK YOUR GAME</h1>
          <h3>
            Show everyone who is the{" "}
            <Link to={"/community"}>
              <span>NUMBER ONE</span>
            </Link>
          </h3>
        </div>
        <div className="CTANewUsers_link_container">
          <Link className="CTANewUsers_link" to={"/login"}>
            ¡BOOK NOW!
          </Link>
        </div>
        <hr className="divider" />
      </div>
    );
  }
}

export default CTABooking;
