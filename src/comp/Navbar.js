import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Textarea from "./Textarea";
import Pricing from "./Pricing";
import AboutUs from "./About";

function Navbar() {
  const linkStyle = {
    textDecoration: "none", // Remove underline from links
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            Text Fun
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav" // Use ID here
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {" "}
            {/* Match data-bs-target with ID */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/Pricing.js" style={linkStyle} className="nav-link">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/About.js" style={linkStyle} className="nav-link">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        {/* <Route path="/" element={<Textarea />} /> */}
        <Route path="/Pricing.js" element={<Pricing />} />
        <Route path="/About.js" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default Navbar;
