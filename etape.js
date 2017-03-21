const fs = require("fs");
const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const app = express();
app.set('view engine', 'ejs'); // générateur de template 
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))  // pour utiliser le dossier public
app.use(bodyParser.json())  // pour traiter les données JSON

var http = require('http');
var url = require('url');
var obj;

fs.readFile('public/text/collection_provinces.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = data;
});

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
  response.write(obj);
  response.end();
}).listen(8081);