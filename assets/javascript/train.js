var config = {
    apiKey: "AIzaSyBHtiaHCLJrSulijWaalTAaO7gqyg0cujs",
    authDomain: "project-awesome-220e5.firebaseapp.com",
    databaseURL: "https://project-awesome-220e5.firebaseio.com",
    projectId: "project-awesome-220e5",
    storageBucket: "project-awesome-220e5.appspot.com",
    messagingSenderId: "163435387860"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#add-train").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var destination = $("#destin").val().trim();
    var frequency = $("#freq").val().trim();
    var nextArrival = "";
    var minutesAway = "";

    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        minutesAway: minutesAway
    };

    database.ref().push(newTrain);

    alert("Train added!");

    $("#train-name").val("");
    $("#destin").val("");
    $("#firs-time").val("");
    $("#freq").val("");

    return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var nextArrival = childSnapshot.val().nextArrival;
  var minutesAway = childSnapshot.val().minutesAway


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td>");
});