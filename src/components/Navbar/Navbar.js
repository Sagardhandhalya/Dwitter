import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../Avatar/Avatar";
import "./Navbar.css";
const Navbar = ({ account }) => {
  return (
    <nav className="navbar__container">
      <div className="left">
        <h2 className="title">Dwitter</h2>
        <ul className="nav_link">
          <li>
            <Link to="/create">Create Post</Link>
          </li>
          <li>
            <Link to="/">All Post</Link>
          </li>
          <li>
            <Link to="/mypost">My Post</Link>
          </li>
        </ul>
      </div>

      <ul className="right">
        <p className="text-white">{account}</p>
        {account && <Avatar account={account} />}
      </ul>
    </nav>
  );
};

export default Navbar;
