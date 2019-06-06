const mysql = require('mysql')
var keys = require("./keys.js")

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

active_query = 'SELECT * FROM reservations WHERE status = "active";'
waitlist_query = 'SELECT * FROM reservations WHERE status = "waitlist";'

var mysql_get = function(query, list) {
    client.connect();

    client.query(query, (err, result) => {
    console.log('query active run')
    if (err) throw err;
    console.log(result)
    renderList(list, result);

    /* for (let row of res.rows) {
    console.log(JSON.stringify(row));
    } */
    client.end();
    });
};

var renderList = function(list, data) {

    for (var i = 0; i < data.length; i++) {
        console.log(data[i]);

        var listGroupItem = $("<li class='" +list+ "-list'>");

        
        listGroupItem.append($("<h4>").text("Name: " + data[i].name));
        listGroupItem.append($("<h5>").text("Phone: " + data[i].phone));
        listGroupItem.append($("<h5>").text("Email: " + data[i].email));

        // listGroupItem.html(
        //     <h4 id="name">data[i].name</h4>
        //     <div id="stats">
        //         <h5><strong>Number of People:</strong> <span id="role">3</span></h5>
        //         <h5><strong>Time:</strong> <span id="age">7:00</span></h5>
        //         <h5><strong>Phone Number:</strong>data[i].phone</h5>
        //     </div>
        //     <hr>
        // )

        $("#"+list).append(listGroupItem);
      }
}

mysql_get(active_query, 'active');
// mysql_get(waitlist_query, 'wait');

