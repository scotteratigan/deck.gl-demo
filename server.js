require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
// const passport = require("./passport");
const { addUser, findUser, authenticateUser } = require("./db");
const WEBSERVER_PORT = process.env.PORT || 5000;
const app = express();
const { cleanUserData } = require("./utils");

app.use(bodyParser.json());

// Serve static files in production
app.use(express.static("client/build"));

// Temporary, for easy testing
app.get("/test", (req, res) => {
  res.send("Server is online.");
});

// New User Route:
app.post("/signup", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    console.error(
      "User tried to sign up without required data. Submitted data was:",
      JSON.stringify(req.body)
    );
    return res.status(409).json({ error: "Required data not supplied." });
  }
  const insertSuccess = await addUser({ name, password });
  if (insertSuccess) {
    const userData = await findUser({ name });
    return res.json(cleanUserData(userData));
  }
  return res.json({ success: false });
});

// Login Route:
app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password)
    return res.status(401).json({
      error: "Credentials not supplied."
    });
  const loginSuccess = await authenticateUser({ name, password });
  return res.json(loginSuccess);
});

// 404:
app.get("*", (req, res) => {
  res.send("Four oh four :/");
});

// Start the server
app.listen(WEBSERVER_PORT, () => {
  console.log(`Listening on port ${WEBSERVER_PORT}`);
});

module.exports = app;
