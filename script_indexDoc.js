var layergroup = L.layerGroup();

var t = document.getElementById("geojsontextarea");;
var map = L.map('mapbootstrap', { layers: [layergroup] }).setView([51.9574469, 7.5719975], 13);//7.5719975,51.9574469  51.957, -0.09

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


check_logged_User()
main_indexDocSite()

async function main_indexDocSite(){

var all_user_data = await get_all_User(); 

var data = clean_docs(all_user_data)


create_User_Table(data)
create_User_Ratios(data)

}

function create_User_Ratios(data){

  document.getElementById("radiobuttons_User").innerHTML = "";
  var list = document.getElementById("radiobuttons_User");
  for (var i = 0; i < data.length; i++) {
    var x = document.createElement("INPUT");
    var y = document.createElement("LABEL");
    y.innerHTML = data[i].Username + "(ID: " + data[i].userID + ")\n";



    x.setAttribute(
      "type",
      "radio",
    );
    x.setAttribute(
      "name",
      "value"
    );
    x.setAttribute(
      "value",
      data[i].userID
    );
    list.appendChild(x);
    list.appendChild(y);
  }
}


 function check_User_radios(){

  const rbs = document.querySelectorAll('input[name="value"]');
  let selectedValue;
  for (const rb of rbs) {
    if (rb.checked) {
      selectedValue = rb.value;
      console.log(rb);
    console.log("selectedValue")
    console.log(selectedValue)
    
     create_table_with_taken_departures(selectedValue)
     
      //clean_tables();
      //create_table_departures(selected_stop, selectedValue)
      break;
    }
  }



}

async function create_table_with_taken_departures(Trav_ID){
  var Trav = await  get_User_by_TravID(Trav_ID)
  console.log("TravellerData");
  console.log(Trav);
var data = await get_stops_from_logged_User(Trav);

console.log("data");
console.log(data);
//Variablendeklaration
var table = document.getElementById("User_Table");
 






/*for (var i = 0; (i < data.length); i++) {

  var row = table.insertRow();  //insert a row
  row.setAttribute("class", "rt1");




  var line1 = row.insertCell()
  line1.innerHTML = data.name;
  line1.setAttribute("class", "t1"); //insert cell at the row variable with the pointcloud (point 2) value on place i of array array_of_objects

  var line2 = row.insertCell();
  line2.innerHTML = data.type; //insert cell at the row variable with the distance value on place i of array array_of_objects
  line2.setAttribute("class", "t1");

  var line3 = row.insertCell();
  line3.innerHTML = data.id; //insert cell at the row variable with the distance value on place i of array array_of_objects
  line3.setAttribute("class", "t1");

  var line4 = row.insertCell() //Direction
  line4.innerHTML = data.departures[stops[i].departure_id].transport.headsign;
  line4.setAttribute("class", "t1"); //insert cell at the row variable with the pointcloud (point 2) value on place i of array array_of_objects

  var line5 = row.insertCell(); //Line Number
  line5.innerHTML = data.departures[stops[i].departure_id].transport.name; //insert cell at the row variable with the distance value on place i of array array_of_objects
  line5.setAttribute("class", "t1");

  
  var line6 = row.insertCell(); //Time
  line6.innerHTML = convert_time( data.departures[stops[i].departure_id].time); //insert cell at the row variable with the distance value on place i of array array_of_objects
  line6.setAttribute("class", "t1");

  var line7 = row.insertCell(); //Departure ID
  line7.innerHTML = stops[i].departure_id; //insert cell at the row variable with the distance value on place i of array array_of_objects
  line7.setAttribute("class", "t1");


}*/



}




 function create_User_Table(only_user) {

 
  //Variablendeklaration
  var table = document.getElementById("User_Table");
 






  for (var i = 0; (i < only_user.length); i++) {


    var row = table.insertRow();  //insert a row
    row.setAttribute("class", "rt1");




    var line1 = row.insertCell()
    line1.innerHTML = only_user[i].Username;
    line1.setAttribute("class", "t1"); //insert cell at the row variable with the pointcloud (point 2) value on place i of array array_of_objects

    var line2 = row.insertCell();
    line2.innerHTML = only_user[i].userID; //insert cell at the row variable with the distance value on place i of array array_of_objects
    line2.setAttribute("class", "t1");


  }
  


}

function clean_docs(data){
var User = [];
for (var i=0;i<data.length;i++){
  if (data[i].role == "traveller"){
    User.push(data[i])
  }
}


  return User;
}

async function get_all_User() {
  
  
  return new Promise(function (res, rej) {
    $.ajax({
      url: "/User",
      method: "GET",

      success: function (result) {

        res(result);

      },
      error: function (err) { console.log(err) }
    });
  })

}