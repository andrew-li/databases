var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });

dbConnection.connect();
dbConnection.query('select * from messages', function(err, result, fields){
  if (err) throw err;
  else {
    console.log(result);
  }
});


