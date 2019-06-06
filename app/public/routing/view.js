
    $.get("/api/view_active")
        .then(function(data) {
            console.log("getting data active")
            renderList(data, "active");
        });
            
    $.get("/api/view_waitlist")
        .then(function(data) {
            console.log("getting data waitlist")
            renderList(data, "waitlist");
        });

    var renderList = function(data, list_type) {

        for (var i = 0; i < data.length; i++) {
            console.log("run")
            //console.log(data[i]);
            console.log(data[i].name)

            var listDiv = $("<div class='" +list_type+ "-list'>");

            var listName = $("<h5><strong>Name: </strong> <span>" + data[i].name + "</span></h5>")
            var listEmail = $("<h5><strong>Email: </strong> <span>" + data[i].email + "</span></h5>")
            var listPhone = $("<h5><strong>Phone :</strong> <span id=>" + data[i].phone + "</span></h5>")

            listDiv.append(listName);
            listDiv.append(listEmail);
            listDiv.append(listPhone);
            listDiv.append("<br>");

            $("."+list_type).append(listDiv);
        }
    }

