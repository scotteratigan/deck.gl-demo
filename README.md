# React-Coding-Test

## Organization

The repository is set up with the backend server code in the root directory, and the client code in the client subfolder.

## Installation & Setup

### Install Packages

From the root directory: `npm run full-install`

- This will install both the server and client files.
- If this fails for some reason:
  1. from root directory, `npm install`
  2. cd client
  3. `npm install` again

### Configure Environment Variables

- In the root directory create .env file with `touch .env`
- Enter the username/password/port of your postgres server in the .env file (see .env_example for format)

### Initialize the Postgres table

- Run the configuration script with `psql --username=postgres users < ./bin/sql/users.sql` (update your username if required)

### Start the Server

- In the root directory, `npm run start`
  - This runs the server and dev build concurrently
  - In production, the back end would serve the static build folder

### Visit the page:

- Your browser should automatically open `http://localhost:3000` when the server is ready.

## Important Notes

- You can either sign up (new account) or log in (existing account) from the login page, and later log out from the nav bar.
- Passwords are stored hashed and salted in the user table (no plain text!).
- I have disabled the requirement to authenticate for easier testing
- The user schema matches the listed project requirements - login date is updated. Different account types do not currently have special functionality.
- Client-side routing is handled by React-Router
- Logo animation uses react-spring
- The map view is rendered by react-map-gl
- Styling is done with node-sass
- Modern syntax is used where appropriate. Hooks, destructuring, etc.
- The map view renders every Muni stop in San Francisco. You can hover or click on bus stops. (See: https://www.sfmta.com/reports/gtfs-transit-data)
- The map view also renders imaginary 'drones' which hover around to mock dynamic data.

---

## Original Prompt:

Please create a react applciation that has user login and athentiation using a postgres server use a user schema. The user db should contain at at a minimum this data.

```
user-name
user-type
user-premisions
user-pwd
user-date-active
```

### user-type : should be either admin or def

### user-premisions: should be either active oour inactive

# Create a login screen where a user enters there name, email, passwod.

#Create a login screen where user can create a new account with name, email, password, user-type and user- premissions set at this time.
update the user-date-active based of the last date and time the user logs into the app.

# App Page

Create a simple map page when you login that shows data in an inerative way, you can signup and use mapbox for free and then display data that you fiind interetsing from any data set you like. This is an optunity to show your creativity and how you think about UI and data visralization, you can do anything you like as long as it interacts with a a map.

Some helpful resourses:

- [deck.gl](https://deck.gl/#/)
- [mapbox](https://www.mapbox.com/)

## Some data api's you might find interesting to use in this map app part:

- [nyc health code data api](https://rapidapi.com/DrRobotmck/api/nyc-health-inspection-results)
- [climate data Record of sea surface temperature](https://catalog.data.gov/dataset/noaa-climate-data-record-cdr-of-sea-surface-temperature-whoi-version-1-0)

# How to submit your code

Once you complete your project with these three components and capabilities you can submit a pull request. The request should be fomated like such:

<your-name>-<month>-LYT-19

- Thank you for taking the time to complete this react project as part of the LYT interview process. We take hiring extremely suriously and hope you will enjoy the challeges you will face while changing how traffic is managed.
