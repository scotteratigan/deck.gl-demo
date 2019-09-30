const { Pool } = require("pg");
const bcrypt = require("bcrypt");
require("dotenv").config();
const database = "users"; // the name of the table
const {
  DB_USER: dbUser,
  DB_PASSWORD: dbPassword,
  DB_HOST: dbHost,
  DB_PORT: dbPort
} = process.env;
const SALT_ROUNDS = 10;
const { cleanUserData } = require("../utils");

// Ensure all environment variables are set correctly:
if (!(dbUser || dbPassword || dbHost || dbPort)) {
  console.error(
    "Required environment variable missing, cannot run.\n" +
      "Please configure the following environment variables:" +
      "DB_USER\n" +
      "DB_PASSWORD\n" +
      "DB_HOST\n" +
      "DB_PORT\n"
  );
  process.exit(1);
} else {
  console.log("Database configuration loaded successfully.");
}

const pool = new Pool({
  // The connection to the db
  user: dbUser,
  host: dbHost,
  database,
  password: dbPassword,
  port: dbPort
});

function authenticateUser({ name, password }) {
  // returns a user data object if authenticated, otherwise null
  return new Promise(async (resolve, reject) => {
    const savedUserData = await findUser({ name });
    if (!savedUserData) return resolve(null);
    console.log("Comparing password to hash: ", savedUserData.user_password);
    bcrypt.compare(password, savedUserData.user_password, (err, isMatch) => {
      if (err) {
        console.error("Error validating password:", err);
        return reject(null);
      }
      return resolve(cleanUserData(savedUserData));
    });
  });
}

function findUser({ name }) {
  // returns user data if user exists, otherwise null
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM ${database} where user_name = $1`,
      [name],
      (err, results) => {
        if (err) {
          console.error("Error searching for user:", err);
          return reject(null);
        }
        const { rowCount } = results;
        if (!rowCount || rowCount < 1) {
          console.warn("User does not exist:", name);
          return resolve(null);
        }
        if (rowCount > 1) {
          console.error("Error, found more than 1 user with name", name);
          // Return nothing - don't risk exposing other users' data.
          return reject(null);
        }
        return resolve(results.rows[0]);
      }
    );
  });
}

function addUser({ name, password }) {
  // success returns true, otherwise false
  return new Promise(async (resolve, reject) => {
    if (!name || !password) {
      console.error("Just tried to add user without supplying required data.");
      return resolve(false);
    }
    const existingUser = await findUser({ name });
    if (existingUser) {
      console.error("Just tried to add a user that already exists.");
      return resolve(false);
    }
    bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
      pool.query(
        `INSERT INTO ${database} (user_name, user_type, user_permissions, user_password, user_date_active) VALUES ($1, $2, $3, $4, $5)`, // add RETURNING * to get insert data
        [name, "def", "active", hash, Date.now()],
        (err, results) => {
          if (err) console.error("Error inserting:", err);
          return resolve(true);
        }
      );
    });
  });
}

module.exports = { findUser, addUser, authenticateUser };
