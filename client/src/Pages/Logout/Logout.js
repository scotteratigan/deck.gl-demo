import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import { defaultUserObj } from "../../utils";

export default function Logout({ user, setUser }) {
  useEffect(() => {
    setTimeout(() => {
      // To emulate network lag, run spinner while we try to log out:
      setUser(defaultUserObj);
    }, 500);
  }, [setUser]);
  return user.name ? (
    <>
      <Spinner active={user.name} />
      <div>Logging out...</div>
    </>
  ) : (
    <Redirect to="/login" />
  );
}
