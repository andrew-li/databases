var db = require('../db').dbConnection;
var mc = require('../db').mc;



module.exports = {
  messages: {
    get: function (callback) {

      mc.get('foo', function (err, value, key) {
        if (value != null) {
          var result = JSON.parse(value);
          var obj = {};
          obj.results = result;
          callback(obj);
        }
        else
        {
          var joinquery = "SELECT messages.createdAt, messages.objectId, messages.roomname, messages.text, messages.updatedAt, users.username "+
            "FROM messages INNER JOIN users ON messages.userId = users.userId;";
          db.query(joinquery, function(err, result, fields){
            if (err) throw err;

            var obj = {};
            obj.results = result;
            callback(obj);

            mc.set("foo", JSON.stringify(result));
          });
        }
      });

    }, // a function which produces all the messages
    post: function (obj) {
      console.log('models post');
      db.query("insert into users (username) values ('"+obj.username+"');", function(){
        db.query("select userId from users where username = '"+obj.username+"';", function(err, result){
          if (err) throw err;
          var userId = result[0].userId;
          var query = "insert into messages (userId, roomname, text) values ("+userId+",'"+obj.roomname+"','"+obj.text+"');";
          db.query(query, function() {
            // query = "select * from messages where roomname = '"
            //   + obj.roomname +
            //   "' text = '"
            //   + obj.text +
            //   "' username = '"
            //   + obj.username + "';"
            query = "SELECT messages.createdAt, messages.objectId, messages.roomname, messages.text, messages.updatedAt, users.username "+
            "FROM messages INNER JOIN users ON messages.userId = users.userId;";
            db.query(query, function(err, result) {
              mc.set("foo", JSON.stringify(result)); //could maybe be optimized to first get from cache and then append one line
            });
          });
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

