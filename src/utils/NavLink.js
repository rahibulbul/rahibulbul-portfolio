// NavLink.js
import React from "react";
import { Link } from "react-scroll";

const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      smooth={true}
      duration={500}
      spy={true}
      offset={-70}
      activeClass="active"
      className="nav-link"
    >
      {children}
    </Link>
  );
};

export default NavLink;
