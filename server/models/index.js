var db = require('../db').dbConnection;




module.exports = {
  messages: {
    get: function (callback) {
      console.log('get');

      var joinquery = "SELECT messages.createdAt, messages.objectId, messages.roomname, messages.text, messages.updatedAt, users.username "+
        "FROM messages INNER JOIN users ON messages.userId = users.userId;";
      db.query(joinquery, function(err, result, fields){
        if (err) throw err;
        var obj = {};
        obj.results = result;
        callback(obj);
      });
    }, // a function which produces all the messages
    post: function (obj) {
      console.log('models post');
      db.query("insert into users (username) values ('"+obj.username+"');", function(){
        db.query("select userId from users where username = '"+obj.username+"';", function(err, result){
          if (err) throw err;
          var userId = result[0].userId;
          var query = "insert into messages (userId, roomname, text) values ("+userId+",'"+obj.roomname+"','"+obj.text+"');";
          console.log(query);
          db.query(query);
        })
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

