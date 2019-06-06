const express = require('express')
var path = require("path");
const inquirer = require('inquirer')
const fs = require('fs')
const mysql = require('mysql')
const readline = require('readline')
var keys = require("./keys.js")

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/index.html"));
});

app.get("/make", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/make.html"));
});

/* app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/view.html"));
}); */



var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username

    user: "root", //keys.mysql.id,
    password: "Tbh.94552", // keys.mysql.secret,

    database: "reservationsDB"
  });
  
app.use(express.static('public'));

var client = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username

    user: "root", //keys.mysql.id,
    password: "Tbh.94552", // keys.mysql.secret,

    database: "reservationsDB"
  });

// Displays all characters
app.get("/view", function(req, res) {
  // return res.json(characters);
/* 
  client.connect();

  client.query('SELECT * FROM reservations WHERE status = "active";', (err, result) => {
    console.log('query active run')
    if (err) throw err;
    //res.json(result)

  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
  });


  client.query('SELECT * FROM reservations WHERE status = "waitlist";', (err, result) => {
    console.log('query waitlist run')
    if (err) throw err;
    //res.json(result)

  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
  });

 */


  res.sendFile(path.join(__dirname, "app/public/view.html"));

});











/* // Displays all characters
app.get("/api/characters", function(req, res) {
  return res.json(characters);
});

// Displays a single character, or returns false
app.get("/api/characters/:character", function(req, res) {
  var chosen = req.params.character;

  console.log(chosen);

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  return res.json(false);
}); */



/* // Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newcharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
}); */

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
