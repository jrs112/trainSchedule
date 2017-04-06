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
    var firstTime = $("#first-time").val().trim();
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % frequency;
    var minutesAway = frequency - tRemainder;
    var nextArrival = moment().add(minutesAway, "minutes");
    // console.log(nextArrival);


    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        firstTime: firstTime
    };

    database.ref().push(newTrain);

    alert("Train added!");

    $("#train-name").val("");
    $("#destin").val("");
    $("#first-time").val("");
    $("#freq").val("");

    return false;
});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var frequency = childSnapshot.val().frequency;
  var firstTime = childSnapshot.val().firstTime;
  var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
  var currentTime = moment();
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % frequency;
  var minutesAway = frequency - tRemainder;
  var nextArrival = moment().add(minutesAway, "minutes");


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency + "</td><td>" + moment(nextArrival).format("hh:mm a") + "</td><td>" + minutesAway + "</td>");
});