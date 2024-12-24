import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCompass, FaHeart, FaUser } from "react-icons/fa";
import ContinueWatching from "./ContinueWatching";
import "../css/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="logo">PrimeVision</h1>
      <ul className="menu">
        <li>
          <Link to="/">
            <FaHome className="menu-icon" /> Home
          </Link>
        </li>
        <li>
          <Link to="/explore">
            <FaCompass className="menu-icon" /> Explore
          </Link>
        </li>
        <li>
          <Link to="/favourites">
            <FaHeart className="menu-icon" /> Favourites
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <FaUser className="menu-icon" /> Profile
          </Link>
        </li>
        <li>
          <Link to="/MyMovies">
            <FaUser className="menu-icon" /> MyMovies
          </Link>
        </li>
      </ul>
      <ContinueWatching />
    </div>
  );
};

export default Sidebar;
