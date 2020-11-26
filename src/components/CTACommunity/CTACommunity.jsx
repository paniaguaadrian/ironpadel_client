import React, { Component } from "react";
import { Link } from "react-router-dom";

// CSS
import "./CTACommunity.css";

class CTACommunity extends Component {
  render() {
    return (
      <div className="CTABooking_container">
        <Link to={"/community"}>
          <div className="CTABooking_title">
            <h1>
              WATCH THE IRONPADEL <span>COMMUNITY</span>
            </h1>
          </div>
          <div className="CTANewUsers_image">
            <img src="/CTACommunity_image.jpeg" alt="Padel blade" />
          </div>
          <div className="CTANewUsers_subTitle">
            <h3>
              TAKE A LOOK AT
              <br />
              <span>ALL CURRENT MATCHES</span>
              <br />
              <span>& BEST PLAYERS</span>
            </h3>
          </div>
        </Link>

        {/* <div className="CTANewUsers_link_container">
          <Link className="CTANewUsers_link" to={"/booking"}>
            ¡BOOK NOW!
          </Link>
        </div> */}
        {/* <hr className="divider" /> */}
      </div>
    );
  }
}

export default CTACommunity;
