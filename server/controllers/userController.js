const mysql = require("mysql");
require("dotenv").config({ path: ".env" });

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

console.log(1);
// View users
exports.view = (req, res) => {
  // res.render("home");
  console.log(5);
  // // User the connection
  connection.query(
    'SELECT * FROM usermanagement WHERE status = "active"',
    (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render("home", { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query(
    "SELECT * FROM usermanagement WHERE first_name LIKE ? OR last_name LIKE ?",
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from user table: \n", rows);
    }
  );
};

exports.form = (req, res) => {
  res.render("add-user");
};

exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;

  // Use the connection
  connection.query(
    "INSERT INTO usermanagement SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?",
    [first_name, last_name, email, phone, comments],
    (err, rows) => {
      if (!err) {
        res.render("add-user", { alert: "User added successfully" });
      } else {
        console.log(err);
      }
      console.log("The data from the table: \n", rows);
    }
  );
};

exports.edit = (req, res) => {
  // Use the connection
  connection.query(
    "SELECT * from user WHERE id = ?"[req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("edit-user", { rows });
      } else {
        console.log(err);
      }
      console.log("The data from the table: \n", rows);
    }
  );
};

// connection.getConnection((err, connection) => {
//   if (err) throw err; // not connected
//   console.log("Connected as ID " + connection.threadId);
// }
