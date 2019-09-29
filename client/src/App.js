import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import Navbar from "./Components/Navbar/Navbar";
import { defaultUserObj } from "./utils";

function Home() {
  return <h2>Home</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default function App() {
  const [user, setUser] = useState(defaultUserObj);
  return (
    <Router>
      <div>
        <Navbar user={user} />
        <Switch>
          <Route path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route path="/logout">
            <Logout user={user} setUser={setUser} />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
