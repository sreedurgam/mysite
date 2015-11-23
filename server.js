var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require("cookie-parser");

var session = require("express-session");
var morgan = require('morgan');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var flash = require("connect-flash");

var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
//console.log(configDB.url);
require('./config/passport')(passport);

//////////get data from mongodb//////////
var MongoClient = require('mongodb').MongoClient;
// Connect to the db
MongoClient.connect(configDB.url, function(err, db) {
  if(!err) {
    console.log("We are connected");
    //db.collection('users').find().toArray(function(err, docs) {
   // console.log(JSON.stringify(docs));
   // console.log("***********************");
    //});
    }
    });



///////////////////////////////////////////

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
                 saveUninitialized: true, 
                 resave: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

require('./app/routes.js')(app, passport);
//app.use('/', function(req, res){
//	res.send('Our first express program');
//	console.log(req.cookies);
//	console.log("*******************");
//	console.log(req.session);
//});

app.listen(port);
console.log("Server running at : "+ port);