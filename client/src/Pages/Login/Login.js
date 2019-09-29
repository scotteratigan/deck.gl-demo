import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "../../Components/Spinner/Spinner";
import "./Login.scss";

export default function Login({ user, setUser }) {
  const MIN_NAME_LENGTH = 4;
  const MIN_PASSWORD_LENGTH = 6;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [helpMsg, setHelpMsg] = useState(""); // helps guide user in filling out form
  const [submitting, setSubmitting] = useState(false); // controls spinner while we wait on server response

  function handleNameInput(inputName) {
    // Names should be capitalized, so let's enforce that:
    setName(inputName.substring(0, 1).toUpperCase() + inputName.substring(1));
  }

  function handleCreateAccount() {
    // When user attempts to create new account, perform basic validation first:
    setHelpMsg("");
    // if (!name) return setHelpMsg("Please enter your name.");
    // if (name.length < MIN_NAME_LENGTH)
    //   return setHelpMsg(
    //     `Your name must be at least ${MIN_NAME_LENGTH} letters.`
    //   );
    // if (!password) return setHelpMsg("Please enter a password.");
    // if (password.length < MIN_PASSWORD_LENGTH)
    //   return setHelpMsg(
    //     `Your password must be at least ${MIN_PASSWORD_LENGTH} characters.`
    //   );
    // if (!confirmPassword) return setHelpMsg("Please confirm your password.");
    // if (password !== confirmPassword) {
    //   setPassword("");
    //   setConfirmPassword("");
    //   return setHelpMsg("Passwords don't match!");
    // }
    setHelpMsg("Creating your account...");
    // todo: Basic checks all pass, create the account:
    setSubmitting(true);
    setTimeout(() => {
      setUser({
        name,
        type: "def",
        active: true
      });
    }, 300);
  }

  return (
    <form>
      <label forHtml="name-input">Name:</label>
      <input
        autoFocus
        id="name-input"
        type="text"
        value={name}
        onChange={e => handleNameInput(e.target.value)}
      ></input>
      <label forHtml="password-input">Password:</label>
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
      <label forHtml="confirm-password-input">Confirm Password:</label>
      <input
        id="confirm-password-input"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
      ></input>
      <div>{helpMsg}</div>
      <button type="button" onClick={handleCreateAccount}>
        Create Account
      </button>
      <Spinner active={submitting} />
      {user.name && <Redirect to="/home" />}
    </form>
  );
}
