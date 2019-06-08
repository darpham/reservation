$("#add-btn").on("click", function(event) {
    event.preventDefault();

    var newReservation = {
      name: $("#name").val().trim(),
      number: $("#number").val().trim(),
      email: $("#email").val().trim()
    };

    // Question: What does this code do??
    $.post("/api/add", newReservation)
      .then(function(data) {
        console.log(data);
        alert("Adding reservation...");
      });

  });