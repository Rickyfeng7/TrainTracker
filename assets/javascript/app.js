$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdE2Dqn4hc7bU_DtczygrcDNg3Clrh5lo",
    authDomain: "demotime-dcc0b.firebaseapp.com",
    databaseURL: "https://demotime-dcc0b.firebaseio.com",
    projectId: "demotime-dcc0b",
    storageBucket: "demotime-dcc0b.appspot.com",
    messagingSenderId: "787160010511"
  };

  firebase.initializeApp(config);

  var data = firebase.database();

  	$("#add").on("click", function(event){

  		event.preventDefault();

  	var name=$("#train").val().trim();
    var destination=$("#destination").val().trim();
    var frequency=$("#frequency").val().trim();
    var firstTrainTime=$("#firstTrain").val().trim();

    frequency = moment(moment(frequency,"hh:mm A").subtract(1,"year"),"hh:mm").format("hh:mm A")

 	  data.ref().push({

      nzame: name,
      destination: destination,
      frequency: frequency,
      firstTrainTime: firstTrainTime,
      trainadded: firebase.database.ServerValue.TIMESTAMP

  	})
});

  	data.ref().on("child_added", function(snapshot) {
   	console.log(snapshot.val());

   	// var use = snapshot.val();
  	// console.log(sv.name+"from firebase");
    // console.log(sv.destination+"from firebase");
    // console.log(sv.Frequency+"from firebase");
    // console.log(sv.firstTrainTime+"from firebase");

    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrainTime = snapshot.val().firstTrainTime;	
    var diff = moment().diff(moment(frequency,"hh:mm A"), "m");
    var modulo = diff % firstTrainTime
    var waitTime = firstTrainTime - modulo;
        arrivalTime = moment().add(waitTime, "m");
    var actualArrive = moment(arrivalTime).format("hh:mm, A");
      console.log(modulo);
   
    var table =$("tbody");
    table.append(`<tr>
    <td>${name}</td>
    <td>${destination}</td>
    <td>${firstTrainTime}</td>
    <td>${actualArrive}</td>
    <td>${waitTime}</td>
    </tr>`);    

	});
})