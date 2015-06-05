var models = require('../models');
var bluebird = require('bluebird');
var http = require("http");
var urlParser = require('url');

var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

var sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var collectData = function(request, callback){
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(JSON.parse(data));
  });
};

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('get');
      sendResponse(req, res);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('post');
      // sendResponse(res);
    }
    // , // a function which handles posting a message to the database
    // options: function (req, res) {
    //   sendResponse(res);
    // }
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

