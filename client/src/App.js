import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Map from "./Pages/Map/Map";
import { defaultUserObj } from "./utils";

export default function App() {
  const [user, setUser] = useState(defaultUserObj);
  return (
    <Router basename={"/deck.gl-demo"}>
      <div>
        <Navbar user={user} />
        <Switch>
          <Route path="/login">
            <Login user={user} setUser={setUser} />
          </Route>
          <Route path="/logout">
            <Logout user={user} setUser={setUser} />
          </Route>
          <Route path="/map">
            <Map user={user} />
          </Route>
          <Route path="/">
            <Home user={user} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
