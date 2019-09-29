import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ user }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {!user.name ? (
            <Link to="/login">Login</Link>
          ) : (
            <Link to="/logout">Logout</Link>
          )}
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </nav>
  );
}
