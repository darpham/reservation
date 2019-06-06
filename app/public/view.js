$(document).ready(function() {
    // app.use(express.static(path.join(__dirname, '/public')));


    console.log("calling view.js")

      
    $.get("/api/view_active")
        .then(function(data) {
          console.log("getting data", data);
        });

    $.get("/api/view_waitlist")
        .then(function(data) {
          console.log("getting data", data);
        });






 /*    

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
            console.log("appending")
            $("#"+list).append(listGroupItem);
        }
    } */

});