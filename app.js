const express = require("express");
const exphbs = require("express-handlebars"); // updated to 6.0.X
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// To serve Static Files (img, css files)
app.use(express.static("public"));

//
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.get("/", (req, res) => {
  res.render("home");
});

// const routes = require("./server/routes/user");
// app.use("/", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

// Connection Pool
// You don't need the connection here as we have it in userController
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
