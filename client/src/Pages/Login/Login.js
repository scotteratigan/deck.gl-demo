import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Spinner from "../../Components/Spinner/Spinner";
import Logo from "../../Components/Logo/Logo";
import "./Login.scss";

export default function Login({ user, setUser }) {
  const MIN_NAME_LENGTH = 4;
  const MIN_PASSWORD_LENGTH = 6;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [radioInput, setRadioInput] = useState({
    logIn: false,
    signUp: true
  });
  const [helpMsg, setHelpMsg] = useState(""); // helps guide user in filling out form
  const [submitting, setSubmitting] = useState(false); // controls spinner while we wait on server response

  function handleNameInput(inputName) {
    // Names should be capitalized, so let's enforce that:
    setName(inputName.substring(0, 1).toUpperCase() + inputName.substring(1));
  }

  function handleSignUp() {
    // When user attempts to create new account, perform basic validation first:
    setHelpMsg("");
    if (!name) return setHelpMsg("Please enter your name.");
    if (name.length < MIN_NAME_LENGTH)
      return setHelpMsg(
        `Your name must be at least ${MIN_NAME_LENGTH} letters.`
      );
    if (!password) return setHelpMsg("Please enter a password.");
    if (password.length < MIN_PASSWORD_LENGTH)
      return setHelpMsg(
        `Your password must be at least ${MIN_PASSWORD_LENGTH} characters.`
      );
    if (!confirmPassword) return setHelpMsg("Please confirm your password.");
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return setHelpMsg("Passwords don't match!");
    }
    setHelpMsg("Creating your account...");
    setSubmitting(true);
    setTimeout(() => {
      // putting this in a timeout to simulate a slower server response
      const submitData = {
        name,
        password
      };
      console.log("submitting data:", submitData);
      axios
        .post("/signup", submitData)
        .then(res => {
          console.log("response:", res);
          if (res.status === 200) setUser({ ...res.data });
          else setHelpMsg("Sign Up failed. Name may already exist.");
        })
        .catch(err => {
          setSubmitting(false);
          setHelpMsg("Error signing up.");
          console.error("Error:", err);
        });
    }, 300);
  }

  function handleLogin() {
    setSubmitting(true);
    setTimeout(() => {
      // putting this in a timeout to simulate a slower server response
      // todo: combine with function above to make DRYer
      const submitData = {
        name,
        password
      };
      console.log("submitting data:", submitData);
      axios
        .post("/login", submitData)
        .then(res => {
          console.log("response:", res);
          if (res.status === 200) setUser({ ...res.data });
          else
            setHelpMsg("Log In failed - either name or password was incorrect");
        })
        .catch(err => {
          setSubmitting(false);
          setHelpMsg("Error logging in.");
          console.error("Error:", err);
        });
    }, 300);
  }

  function handleRadioSelect(e) {
    switch (e.target.id) {
      case "select-login":
        return setRadioInput({
          logIn: true,
          signUp: false
        });
      case "select-signup":
        return setRadioInput({
          logIn: false,
          signUp: true
        });
      default:
        console.error("Unknown login-type selected.");
    }
  }

  return (
    <>
      <Logo />
      <div className="login-form-wrapper">
        <form>
          <h1>Account Log-In or Sign-Up</h1>
          <div className="login-input-wrapper">
            <div className="login-type-wrapper">
              <label htmlFor="select-signup">Sign-Up</label>
              <input
                type="radio"
                id="select-signup"
                checked={radioInput.signUp}
                onChange={handleRadioSelect}
              />
              <label htmlFor="select-login">Log-In</label>
              <input
                type="radio"
                id="select-login"
                checked={radioInput.logIn}
                onChange={handleRadioSelect}
              />
            </div>
            <label htmlFor="name-input">Name:</label>
            <input
              autoFocus
              id="name-input"
              type="text"
              value={name}
              onChange={e => handleNameInput(e.target.value)}
            ></input>
            <label htmlFor="password-input">Password:</label>
            <input
              id="password-input"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() =>
                setHelpMsg(
                  "Password can be any combination of at least 6 characters."
                )
              }
            ></input>
            {radioInput.signUp && (
              <>
                <label htmlFor="confirm-password-input">
                  Confirm Password:
                </label>
                <input
                  id="confirm-password-input"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                ></input>
                <div>{helpMsg}</div>
              </>
            )}

            {radioInput.signUp ? (
              <button type="button" onClick={handleSignUp}>
                Create Account
              </button>
            ) : (
              <button onClick={handleLogin} type="button">
                Log In
              </button>
            )}
          </div>
        </form>
        <Spinner active={submitting} />
        {user.name && <Redirect to="/home" />}
      </div>
    </>
  );
}
