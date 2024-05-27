import { NavLink } from "react-router-dom";
import Logo from "../assets/Images/smalllogo.png";
import { Image } from "react-bootstrap";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookBookmark,
  faBell,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <div className="imgWrap">
            <Image src={Logo} />
          </div>
          <span>BookStores</span>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>
            <li>
              <NavLink to="/">
                <FontAwesomeIcon icon={faBookBookmark} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/blogs">
                <FontAwesomeIcon icon={faBell} />
              </NavLink>
            </li>
            <li>
              <NavLink to="/projects">
                <FontAwesomeIcon icon={faCartShopping} />
              </NavLink>
            </li>
          </ul>
          <div className="profileWrap">
            <div
              className="imgWrap"
              style={{ backgroundImage: `url(${Logo})` }}
            />
            <div className="dropDownProfile"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};
const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="52"
    height="24"
    viewBox="0 0 52 24"
  >
    <g id="Group_9" data-name="Group 9" transform="translate(-294 -47)">
      <rect
        id="Rectangle_3"
        data-name="Rectangle 3"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 47)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_5"
        data-name="Rectangle 5"
        width="42"
        height="4"
        rx="2"
        transform="translate(304 67)"
        fill="#574c4c"
      />
      <rect
        id="Rectangle_4"
        data-name="Rectangle 4"
        width="52"
        height="4"
        rx="2"
        transform="translate(294 57)"
        fill="#574c4c"
      />
    </g>
  </svg>
);
export default Header;
