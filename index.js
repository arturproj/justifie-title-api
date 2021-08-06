require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const MongoStore = require("connect-mongo")(expressSession);
const mongoose = require("mongoose");

const RouteToken = require("./routes/token");
const RouteJustify = require("./routes/justify");

// init db api
mongoose.connect(
  process.env.MONGO_URI ||
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) =>
    err !== null
      ? console.log("DB is not connected err:", err)
      : console.log("DB connected")
);
// init express api
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// enable session management
app.use(
  expressSession({
    secret: "konexioasso07",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// middleware token
app.all("/token", RouteToken);
// middleware justify
app.all("/justify", RouteJustify);

// define the error 404 route for all methodes
app.all("*", function (req, res) {
  res.send("Welcome to JUSTIFIE API");
});

const PORT = process.env.API_PORT || 3000;
const HOST = process.env.API_HOST || "localhost";

app.listen(PORT, HOST, () => {
  console.log(`⚡️[server]: nodejs is running at http://${HOST}:${PORT}`);
});

// process.on("uncaughtException", (error) => {
//   console.log("Oh my god, something terrible happened: ", error);

//   // process.exit(1); // exit application
// });

process.on("SIGTERM", (code) => {
  console.log(`About to exit with code: ${code}`);
  process.exit();
});

module.exports = app;
