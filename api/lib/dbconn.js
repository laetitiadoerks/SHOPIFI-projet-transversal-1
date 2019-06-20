var mysql        = require('mysql2');
var connection   = mysql.createConnection({
  supportBigNumbers: true,
  bigNumberStrings: true,
  host     : "10.194.69.15",
  user     : "A6",
  password : "nm6ofcCAJ7OrlVhD",
  database : "A6"
});
console.log("salut connection");;

module.exports = connection;
