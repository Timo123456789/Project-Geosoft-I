var layergroup = L.layerGroup();

var t = document.getElementById("geojsontextarea");;
var map = L.map('mapbootstrap', { layers: [layergroup] }).setView([51.9574469, 7.5719975], 13);//7.5719975,51.9574469  51.957, -0.09

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


check_logged_User()
main_indexDocSite()

async function main_indexDocSite() {

  var all_user_data = await get_all_User();
  var data = clean_docs(all_user_data)
  create_markers(data)
  create_User_Table(data)
  create_User_Ratios(data)

}



async function create_markers(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    var stops_from_iten_User = await get_stops_by_UserID(data[i].userID);
    console.log("stop_data von " + i + "ten Nutzern");
    console.log(stops_from_iten_User);
    set_Markers_at_stop_positions(stops_from_iten_User)
  }


}


function create_User_Ratios(data) {

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


function check_User_radios() {

  const rbs = document.querySelectorAll('input[name="value"]');
  let selectedValue;
  for (const rb of rbs) {
    if (rb.checked) {
      selectedValue = rb.value;
      console.log(rb);
      console.log("selectedValue")
      console.log(selectedValue)
      clean_tables()
      create_table_with_taken_departures(selectedValue)

      //clean_tables();
      //create_table_departures(selected_stop, selectedValue)
      break;
    }
  }



}



function check_User_radios_all_dep() {

  const rbs = document.querySelectorAll('input[name="value"]');
  let selectedValue;
  for (const rb of rbs) {
    if (rb.checked) {
      selectedValue = rb.value;
      console.log(rb);
      console.log("selectedValue")
      console.log(selectedValue)
      add_every_status_of_all_departures_to_infected(selectedValue)

      //clean_tables();
      //create_table_departures(selected_stop, selectedValue)
      break;
    }
  }



}





async function create_table_with_taken_departures(Trav_ID) {





  var Trav = await get_User_by_TravID(Trav_ID)
  // console.log("TravellerData");
  //console.log(Trav);
  var user_stop_data = await get_stops_by_UserID(Trav[0].userID);

  /*console.log("user_stop_data");
  console.log(user_stop_data);
  console.log("stop id");
  console.log(user_stop_data[0].stop_id);
  console.log("dep id");
  console.log(user_stop_data[0].departure_id);*/
  //Variablendeklaration
  var table = document.getElementById("Departure_Table");
  var checkbox = []






  for (var i = 0; (i < user_stop_data.length); i++) {

    var row = table.insertRow();  //insert a row
    row.setAttribute("class", "rt2");
    var idobject = {
      id: user_stop_data[i].stop_id,
    }
    console.log("idobject" + i);
    console.log(idobject);
    var departure_data = await get_one_stop_with_ID(idobject)

    console.log("departure_data");
    console.log(departure_data);
    console.log(departure_data[0].departure);

    var line1 = row.insertCell()
    line1.innerHTML = departure_data[0].name;
    line1.setAttribute("class", "t1"); //insert cell at the row variable with the pointcloud (point 2) value on place i of array array_of_objects

    var line2 = row.insertCell();
    line2.innerHTML = departure_data[0].type; //insert cell at the row variable with the distance value on place i of array array_of_objects
    line2.setAttribute("class", "t1");

    var line3 = row.insertCell();
    line3.innerHTML = departure_data[0].id; //insert cell at the row variable with the distance value on place i of array array_of_objects
    line3.setAttribute("class", "t1");

    var line4 = row.insertCell() //Direction
    line4.innerHTML = departure_data[0].departures[user_stop_data[i].departure_id].transport.headsign;
    line4.setAttribute("class", "t1"); //insert cell at the row variable with the pointcloud (point 2) value on place i of array array_of_objects

    var line5 = row.insertCell(); //Line Number
    line5.innerHTML = departure_data[0].departures[user_stop_data[i].departure_id].transport.name; //insert cell at the row variable with the distance value on place i of array array_of_objects
    line5.setAttribute("class", "t1");


    var line6 = row.insertCell(); //Time
    line6.innerHTML = convert_time(departure_data[0].departures[user_stop_data[i].departure_id].time); //insert cell at the row variable with the distance value on place i of array array_of_objects
    line6.setAttribute("class", "t1");

    var line7 = row.insertCell(); //Departure ID
    line7.innerHTML = user_stop_data[0].departure_id; //insert cell at the row variable with the distance value on place i of array array_of_objects
    line7.setAttribute("class", "t1");

    var line8 = row.insertCell(); //Departure ID
    line8.innerHTML = i + 1; //insert cell at the row variable with the distance value on place i of array array_of_objects
    checkbox.push(i);
    line8.setAttribute("class", "t1");



  }
  create_Departure_Ratios(checkbox, user_stop_data, Trav_ID)



}

function create_Departure_Ratios(checkbox, user_stop_data, Trav_Id) {

  document.getElementById("radiobuttons_departures").innerHTML = "";
  var list = document.getElementById("radiobuttons_departures");
  for (var i = 0; i < checkbox.length; i++) {
    var x = document.createElement("INPUT");
    var y = document.createElement("LABEL");
    y.innerHTML = checkbox[i] + 1;

    var row_data = {
      checkbox: checkbox[i],
      stop_id: user_stop_data[i].stop_id,
      dep_id: user_stop_data[i].departure_id,
      Trav_id: Trav_Id

    }
    console.log("row_data");
    console.log(row_data);
    var JSON_row_data = JSON.stringify(row_data)

    x.setAttribute(
      "type",
      "radio",
    );
    x.setAttribute(
      "name",
      "value_dep_doc"
    );
    x.setAttribute(
      "value",
      JSON_row_data
    );
    list.appendChild(x);
    list.appendChild(y);
  }

}


function check_Departure_radios() {

  const rbs = document.querySelectorAll('input[name="value_dep_doc"]');
  let selectedValue;
  for (const rb of rbs) {
    if (rb.checked) {
      selectedValue = rb.value;
      console.log(rb);
      selectedValue = JSON.parse(selectedValue)
      console.log("selectedValue")
      console.log(selectedValue.stop_id)
      console.log(selectedValue.dep_id)
      add_every_status_to_infected(selectedValue)


      break;
    }
  }



}
async function add_every_status_to_infected(Dep_Obj) {
  var begin_time = document.getElementById("Begin_time").value;
  var end_time = document.getElementById("End_time").value;
  var Update_Object = {
    // UserID: Dep_Obj.Trav_Id, // Jedes Element mit der gleichen Stop ID und der gleichen Dep ID muss geupdatet werden damit alle Nutzer benachrichigt werden
    DepID: Dep_Obj.dep_id,
    StopID: Dep_Obj.stop_id,
    infection_risk: "yes",
    begin_time: begin_time,
    end_time: end_time
  }
  console.log(Update_Object);
  $.ajax({
    url: "/selected_departures",
    method: "PUT",
    data: Update_Object,
    success: function (result) {
      console.log(" res(result");
      console.log(result);

      return result;



    },
    error: function (err) { console.log(err) }
  });


}


async function add_every_status_of_all_departures_to_infected(Trav_ID) {
  var Trav = await get_User_by_TravID(Trav_ID)
  // console.log("TravellerData");
  //console.log(Trav);
  var user_stop_data = await get_stops_by_UserID(Trav[0].userID);
  console.log(user_stop_data);
  for (var i = 0; i < user_stop_data.length; i++) {
    var infec_dep = {
      stop_id: user_stop_data[i].stop_id,
      dep_id: user_stop_data[i].departure_id,
    }
    add_every_status_to_infected(infec_dep)
  }

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

function clean_docs(data) {
  var User = [];
  for (var i = 0; i < data.length; i++) {
    if (data[i].role == "traveller") {
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