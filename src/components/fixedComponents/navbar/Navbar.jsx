import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../../../lib/AuthProvider";

// CSS
import "./Navbar.css";
import logo from "./ironpadel_verde.png";

class Navbar extends Component {
  state = {
    clicked: false,
  };

  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <nav className="NavbarItems">
        <Link to={"/"}>
          <img src={logo} className="ironPadel_logo" alt="" />
        </Link>
        <div className="menu-icon"></div>
        {isLoggedin ? (
          <>
            <ul className="">
              <li className="navbar-link">
                <Link to="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="navbar-link">
                <Link to={`/profile/${user._id}`}>
                  <a>Profile</a>
                </Link>
              </li>

              <li className="navbar-link">
                <Link to="/booking">
                  <a>Booking</a>
                </Link>
              </li>
              <li className="navbar-link">
                <Link to="/community">
                  <a>Community</a>
                </Link>
              </li>
              {/* <p className="navbar-user">username: {user.username}</p> */}
              <li className="navbar-link">
                <button className="navbar-button" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul>
              <li className="navbar-link">
                <Link to="/">
                  <a>Home</a>
                </Link>
              </li>

              <li className="navbar-link">
                <Link to="/booking">
                  <a>Booking</a>
                </Link>
              </li>
              <li className="navbar-link">
                <Link to="/community">
                  <a>Community</a>
                </Link>
              </li>
              <li className="navbar-link">
                <Link to="/login">
                  <button className="navbar-button">Login</button>
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);

// const { user, logout, isLoggedin } = this.props;
//     return (
//       <nav className="NavbarItems">
//         <Link to={"/"} id="home-btn">
//           <h4>Home</h4>
//         </Link>
//         {isLoggedin ? (
//           <>
//             <p className="navbar-user">username: {user.username}</p>
//             <button className="navbar-button" onClick={logout}>
//               Logout
//             </button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">
//               <button className="navbar-button">Login</button>
//             </Link>
//             <br />
//             <Link to="/signup">
//               <button className="navbar-button">Sign Up</button>
//             </Link>
//           </>
//         )}
//       </nav>
//     );
//   }
