import React, { useState } from "react";
import { Link } from "react-router-dom";
import './index.css'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">
          <img height='50px' src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F014%2F494%2F566%2Foriginal%2Fshopping-bags-on-the-shopping-cart-online-shopping-ideas-png.png&f=1&nofb=1&ipt=180565d19772f97e8437addf0e63c3ca11d3c45feaa958425f8e87871dad3d3a' alt='logo' />
        </Link>
      </div>

      <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          
        </ul>
      </div>

      <div className="search-container">
        <input type="text" placeholder="Search..." />
        <button>Search</button>
      </div>

      <div
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;