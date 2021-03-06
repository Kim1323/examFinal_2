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

var url = require('url');
var obj;

var db // variable qui contiendra le lien sur la BD

MongoClient.connect('mongodb://127.0.0.1:27017/carnet_adresse', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(8081, () => {
    console.log('connexion à la BD et on écoute sur le port 8081')
  })
})

app.get('/',  (req, res) => {
   console.log("allo")
    db.collection('provinces').find().toArray(function(err, resultat){
       if (err) return console.log(err)
    res.render('index.ejs', {provinces: resultat})
    })
})

app.get('/fichier',  (req, res) => {
	console.log("fichier");
   	res.sendFile(__dirname + "/public/text/collection_provinces.json")
})

app.get('/provinces',  (req, res) => {
	console.log("provinces");
	fs.readFile((__dirname + "/public/text/collection_provinces.json"), function (err, data){
		if (err) return console.log(err)
		res.render('index.ejs', {provinces:JSON.parse(data)});
	})
})

app.get('/collection',  (req, res) => {
    console.log('collection')
	fs.readFile((__dirname + "/public/text/collection_provinces.json"), function (err, data){
		if (err) return console.log(err)
		var objJson = JSON.parse(data);
		db.collection('provinces').insertMany(objJson, (err, result) => {
      		if (err) return console.log(err)
      		res.redirect('/')
      	})
	})
})

app.get('/ajouter',  (req, res) => {
    console.log('ajouter')
    var nbRandom = Math.floor(Math.random()*100)+100;
    var objAjout = {
    	code : "QC",
		nom : "Québec",
		capital: nbRandom
	}
	db.collection('provinces').save(objAjout, (err, result) => {
  		if (err) return console.log(err)
      	res.redirect('/')
  	})
})

app.get('/detruire',  (req, res) => {
    console.log('detruire')
	db.collection('provinces').remove({}, (err, result) => {
  		if (err) return console.log(err)
  		res.render('index.ejs', {provinces: result})
  	})
})


app.get('/plusieurs',  (req, res) => {
    console.log('plusieurs')
    fs.readFile((__dirname + "/public/text/collection_provinces.json"), function (err, data){
		if (err) return console.log(err)
		var objJson = JSON.parse(data);
		db.collection('provinces').insertMany(objJson, (err, result) => {
      		if (err) return console.log(err)
      		res.redirect('/')
      	})
	})
})
