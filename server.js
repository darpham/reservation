const express = require('express')
const path = require("path");

const mysql = require("mysql")
require("dotenv").config();
var keys = require("./keys.js")

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/app/public')));

// Routes
app.get("/index", function(req, res) {

    console.log("cd home");
    res.sendFile(path.join(__dirname, "app/public/views/index.html"));
});

app.get("/make", function(req, res) {

    console.log("cd make");
    res.sendFile(path.join(__dirname, "app/public/views/make.html"));
});

app.get("/view", function(req, res) {

    console.log("cd view")
    res.sendFile(path.join(__dirname, "app/public/views/view.html"));

});

app.get("/api/view_active", function(req, res) {

    query = 'SELECT * FROM reservations WHERE status = "active";'
    console.log("sending view_active")
    pullData(query, res)

});

app.get("/api/view_waitlist", function(req, res) {

    query = 'SELECT * FROM reservations WHERE status = "waitlist";'
    console.log("sending view_waitlist")
    pullData(query, res);

});

function pullData(query, res) {

    var client = mysql.createConnection({
        host: "localhost",
        port: 3306,
         
        user: keys.mysql.id,
        password: keys.mysql.secret,
    
        database: "reservationsDB"
    });
    
    client.connect();

    client.query(query, (err, result) => {

        console.log('query run')

        if (err) throw err;
        return res.send(result);
        
    client.end();
    });

}








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
