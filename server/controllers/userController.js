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

// module.exports =
