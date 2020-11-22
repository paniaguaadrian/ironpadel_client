import React, { Component } from "react";
import { Link } from "react-router-dom";

// CSS
import "./CTANewUsers.css";

class CTANewUsers extends Component {
  render() {
    return (
      <div className="CTANewUsers_container">
        <div className="CTANewUsers_title">
          <Link to={"/login"}>
            <h1>
              DESTROY ALL YOUR CODE MATES ON A <span>PADEL COURT</span>
            </h1>
          </Link>
        </div>
        <div className="CTANewUsers_image">
          <img src="/CTANewUsers_image.jpg" alt="Padel blade" />
        </div>
        <div className="CTANewUsers_subTitle">
          <h3>
            REGISTER NOW AND START EARNING THE{" "}
            <Link to={"/community"}>
              <span>PRESTIGE YOU DESERVE</span>
            </Link>
          </h3>
          <p>(Check our Community)</p>
        </div>

        <div className="CTANewUsers_link_container">
          <Link className="CTANewUsers_link" to={"/login"}>
            ¡SIGN UP NOW!
          </Link>
        </div>
        <hr className="divider" />
      </div>
    );
  }
}

export default CTANewUsers;
