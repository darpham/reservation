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
app.get("/", function(req, res) {

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

app.get("/api/search/:name", function(req, res) {

    var name = req.params.name
    //console.log(name)
    query = 'SELECT * FROM reservations WHERE ?'
    // console.log("searching reservations for "+ name)
    queryData(query, res, name);

});


var client = mysql.createConnection({
    host: "localhost",
    port: 3306,
     
    user: keys.mysql.id,
    password: keys.mysql.secret,

    database: "reservationsDB"
});

client.connect();



function queryData(query, res, name) {
    console.log('search query run')
    console.log(name)
    console.log(query);
    client.query(query, {name: name}, (err, result) => {
    
        if (err) throw err;
        this.sql
        return res.send(result);
        
    });
}



function pullData(query, res) {

    client.query(query, (err, result) => {

        console.log('pull query run')

        if (err) throw err;
        return res.send(result);
        
    client.end();
    });
}

function checkActive(res) {

    client.query('SELECT * FROM reservations WHERE status = "active";', (err, result) => {

        console.log('query run')

        if (err) throw err;

        return result.length
    });
}



app.post("/api/add", function(req, res) {
  
    var resData = req.body;
    var numActives = checkActive();
    console.log(numActives);

    if (numActives <= 3) {
        createReservation("active", resData);
    }
    else {
        createReservation("waitlist", resData);
    }

});

    

  function createReservation(reservationType, resData) {
    console.log("Inserting a new product...\n");
    var query = client.query(
      "INSERT INTO reservations SET ?",
      {
        name: resData.name,
        email: resData.email,
        phone: resData.number,
        status: reservationType
      },
      function(err, res) {
        console.log(res + " inserted!\n");
      }
    );
    // logs the actual query being run
    query;
  }

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
