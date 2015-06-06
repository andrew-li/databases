var db = require('../db').dbConnection;




module.exports = {
  messages: {
    get: function (callback) {
      console.log('get');
      db.query('select * from messages', function(err, result, fields){
        if (err) throw err;
        var obj = {};
        obj.results = result;
        callback(obj);
      });
    }, // a function which produces all the messages
    post: function (obj) {
      console.log('models post');
      var query = "insert into messages (username, roomname, text) values ('"+obj.username+"','"+obj.roomname+"','"+obj.text+"');";
      console.log(query);
      db.query(query);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

