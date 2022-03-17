const express = require("express");
const exphbs = require("express-handlebars"); // updated to 6.0.X
const mysql = require("mysql");
const routes = require("./server/routes/user");

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config({ path: ".env" });

// Parsing middleware
// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Parse application/json
app.use(express.json()); // New

// To serve Static Files (img, css files)
app.use(express.static("public"));

//
const handlebars = exphbs.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

// Connection Pool

app.use("/", routes);

app.listen(port, () => console.log(`Listening on port ${port}`));

// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// app.get("/", function (req, res) {
//   connection.query(
//     'SELECT * FROM usermanagement WHERE status = "active"',
//     (err, rows) => {
//       // When done with the connection, release it
//       if (!err) {
//         let removedUser = req.query.removed;
//         res.render("home", { rows, removedUser });
//       } else {
//         console.log(err);
//       }
//       console.log("The data from user table: \n", rows);
//     }
//   );
// });

// connection.getConnection((err, connection) => {
//   if (err) throw err;
//   console.log("Connected as ID " + connection.threadId);
// });
