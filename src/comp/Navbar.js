import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Textarea from "./Textarea";
import Pricing from "./Pricing";
export const Appcontext = createContext();

function Navbar() {
  const [Mode, setMode] = useState("light");
  const Darkmode = () => {
    setMode(Mode === "light" ? "dark" : "light");
    
  };

  return (
    
      <Appcontext.Provider value={{ Mode, setMode }}>
        <Router>
          <nav
            className="navbar navbar-expand-lg bg-body-tertiary "
            data-bs-theme={Mode}
          >
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                Text Fun
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="/navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        {" "}
                        Home
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Pricing.js">
                      <a className="nav-link" href="/">
                        Pricing
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      About Us
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <div className="btn btn-{Mode}" onClick={Darkmode}>
                      {Mode} Enable
                    </div>
                  </li> */}
                </ul>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<Textarea />} />
            <Route path="/Pricing.js" element={<Pricing />} />
          </Routes>
        </Router>
      </Appcontext.Provider>
  
  );
}

export default Navbar;
// export Darkmode;
