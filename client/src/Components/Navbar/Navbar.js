import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar({ user }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <nav className={expanded ? "nav-bg-active" : ""}>
        <div>
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? <span>X</span> : <span>&#8801;</span>}
          </button>
          {expanded && (
            <ul>
              <li>
                <Link to="/" onClick={() => setExpanded(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/map" onClick={() => setExpanded(false)}>
                  Map
                </Link>
              </li>
              <li>
                {!user.name ? (
                  <Link to="/login" onClick={() => setExpanded(false)}>
                    Login
                  </Link>
                ) : (
                  <Link to="/logout" onClick={() => setExpanded(false)}>
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
}
