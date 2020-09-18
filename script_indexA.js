

/**
*@desc  creates Leafleat Map
*@param  map = object of leafleat map
*
*
*
*/
var layergroup = L.layerGroup();

var t = document.getElementById("geojsontextarea");;
var map = L.map('mapbootstrap', { layers: [layergroup] }).setView([51.9574469, 7.5719975], 13);//7.5719975,51.9574469  51.957, -0.09

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var DepID = 0;



check_logged_User() //Function to check if user is logged
getLocation()  //function to run get Location function

main_indexA() //function to run main Method



/**
*@desc Main Method, add Marker at user position and start getbusstop Function 
*@param  actpos= Coordinates of User Position in Array
*
*
*
*/
async function main_indexA(actpos) {
  L.marker(change(actpos)).addTo(map).bindPopup("User Position")
  getbusstops(actpos);

}


/**
*@desc return the user location via Callback function "showPosition"
*@param  temppos = temporary variable
*
*
*/
async function getLocation() {


  if (navigator.geolocation) {
    var temppos = navigator.geolocation.getCurrentPosition(showPosition);
    return temppos;
  } else {
    window.alert("Geolocation is not supported by this browser.");
  }

}


/**
*@desc callback function for "getLocation" function, runs Main Method with actpos variable
*@param  position = variable to save the position#
*@param actpos = array for screening user position
*
*
*/
function showPosition(position) {
  var actpos = [];
  actpos.push(position.coords.longitude);
  actpos.push(position.coords.latitude);
  console.log(actpos);
  main_indexA(actpos)
}


/**
*@desc convert point in GJSON Feature
*@param  point = temporary variable
*@param GJSONPoint = Feature Collection of GeoJSON
*@param featObj2 = Feature Object of GeoJSON
*@return GJSONPoint with values and GeoJSON semantic
*
*/
function convert_point_to_GJSON(point) {
  var GJSONPoint = { type: "FeatureCollection", features: [] };
  var FeatObj2 = {
    type: "Feature",
    properties: []
  };
  FeatObj2.geometry = {
    type: "Point",
    coordinates: point
  };
  GJSONPoint.features.push(FeatObj2);
  return GJSONPoint;
}



/**
*@desc  set marker at actpos variable
*@param  actpos = array of coordinates
*
*
*
*/
function screen_User_Position(actpos) {
  L.marker((convert_GJSON_to_Array(actpos, 0)),/*{icon: bicon}*/).addTo(map) // [51.5, -0.09] change(convert_GJSON_to_Array(busstops,i))
    .bindPopup("Selected Point")
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////API FUNCTIONS////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
*@desc  connect to Here API with data by token,js and starts create_Table_Busstops Function with requested Data
*@param  apiKey = API Key for HERE API
*@param  actpos = Coordinates for HERE API in a Array
*@param  data = data from Here API
*
*
*
*/
function getbusstops(actpos) {
  return new Promise(function (res, rej) {
    $.ajax({
      url: "https://transit.hereapi.com/v8/departures?in=" + actpos + ";r=500",
      method: "GET",
      data: {
        apiKey: HERE_API_KEY
      },
      success: function (result) {
        create_Table_Busstops(result)
      },
      error: function (err) { console.log(err) }
    });
  })
}



/**
*@desc  creates Table with Busstops
*@param  busstops = all data from API
*@param  table = Table Object at HTML Site
*
*
*
*/
async function create_Table_Busstops(busstops) {
  var table = document.getElementById("Table");
  for (var i = 0; (i < busstops.boards.length); i++) {

    var row = table.insertRow();  //insert a row
    row.setAttribute("class", "rt1");

    var pointcloud = row.insertCell()
    pointcloud.innerHTML = busstops.boards[i].place.name;
    pointcloud.setAttribute("class", "t1"); //insert cell at the row variable with the busstops name

    var array_with_calculated_distances = row.insertCell();
    array_with_calculated_distances.innerHTML = busstops.boards[i].place.type; //insert cell at the row variable with the busstop type
    array_with_calculated_distances.setAttribute("class", "t1");

    var array_with_calculated_distances = row.insertCell();
    array_with_calculated_distances.innerHTML = busstops.boards[i].place.id; //insert cell at the row variable with the buustop ID
    array_with_calculated_distances.setAttribute("class", "t1");

    L.marker([busstops.boards[i].place.location.lat, busstops.boards[i].place.location.lng]).addTo(map)
      .bindPopup(busstops.boards[i].place.name + "<br>" + "ID: " + busstops.boards[i].place.id); //set Marker for Bus stop with Busstop ID and Busstop Name
  }


  
    create_Collection_of_all_stops_and_departures(busstops) //Function to create Collection with busstop data
  

  create_list_of_ratio_buttons(busstops); //create List of ratio buttons from busstop data

}




/**
*@desc  creates Collection of all busstops and departures
*@param  busstops = all data from API
*@param  result = Object with all data from API to push this in Collection
*
*
*
*/
function create_Collection_of_all_stops_and_departures(busstops) {
  for (var i = 0; i < busstops.boards.length; i++) {
    result = {
      name: busstops.boards[i].place.name,
      type: busstops.boards[i].place.type,
      id: busstops.boards[i].place.id,
      lat: busstops.boards[i].place.location.lat,
      lng: busstops.boards[i].place.location.lng,
      departures: busstops.boards[i].departures
    };
console.log(result);
    $.ajax({
      url: "/all_busstops_and_departures",
      method: "POST",
      data: result,
      success: function (result) {
        result;
      },
      error: function (err) { console.log(err) }
    });
  }
}



/**
*@desc  creates List of ratio buttons with busstops data
*@param   busstops = all data from all busstops 
*
*
*
*/
function create_list_of_ratio_buttons(busstops) {
  document.getElementById("radiobuttons_stops").innerHTML = "";
  var list = document.getElementById("radiobuttons_stops");
  for (var i = 0; i < busstops.boards.length; i++) {

    var x = document.createElement("INPUT");
    var y = document.createElement("LABEL");
    y.innerHTML = busstops.boards[i].place.name + "(ID: " + busstops.boards[i].place.id + ")";
    x.setAttribute(
      "type",
      "radio",
    );
    x.setAttribute(
      "name",
      "value"
    );
    x.setAttribute(  //Identifier Attribut
      "value",
      busstops.boards[i].place.id
    );
    list.appendChild(x);
    list.appendChild(y);
  }

}



/**
*@desc  creates List of ratio buttons with departures data and stop id
*@param   deparutes = array of departures from selected stop
*@param   stop_id = Stop ID from selected Stop
*
*
*
*/
function create_list_of_ratio_buttons_departures(departures, stop_id) {
  document.getElementById("radiobuttons_departures").innerHTML = "";



  var list = document.getElementById("radiobuttons_departures");
  for (var i = 0; i < departures.length; i++) {
    var x = document.createElement("INPUT");
    var y = document.createElement("LABEL");
    y.innerHTML = departures[i].transport.headsign + "(ID: " + "Dep" + i + ")";



    x.setAttribute(
      "type",
      "radio",
    );
    x.setAttribute(
      "name",
      "value_departures"
    );
    x.setAttribute(
      "departures_id",
      i
    );
    x.setAttribute(
      "stop_id",
      stop_id
    );
    list.appendChild(x);
    list.appendChild(y);

  }

}


/**
  *@desc Async Function to get the value of the checked radio buttons on the site, give this data to create_table_departures Function
  *@param rbs = node list with all values from radio button list
  */
async function check_stop_radios() {
  const rbs = document.querySelectorAll('input[name="value"]');
  let selectedValue;
  for (const rb of rbs) {
    if (rb.checked) {
      selectedValue = rb.value;
      var idobject = {
        id: selectedValue,
      }
      var selected_stop = await get_one_stop_with_ID(idobject);

      clean_tables();
      create_table_departures(selected_stop, selectedValue)
      break;
    }
  }


}

/**
  *@desc Async Function to get the value of the checked radio buttons on the site, give this data to add_selected_stop_as_taken Function
  *@param rbs = node list with all values from radio button list
  *@param selected_Departure_ID = selected Departure ID
  *@param selected_stop_ID = selected Stop ID
  */
async function check_departure_radios() {
  const rbs = document.querySelectorAll('input[name="value_departures"]');
  // console.log(rbs);
  let selected_Departure_ID;
  let selected_stop_ID;
  for (const rb of rbs) {
    if (rb.checked) {
      selected_Departure_ID = rb.attributes.departures_id.nodeValue;
      selected_stop_ID = rb.attributes.stop_id.nodeValue
      add_selected_stop_as_taken(selected_Departure_ID, selected_stop_ID)
      break;
    }
  }


}

/**
  *@desc creates an Object with Departure ID, Stop ID, User ID and Infection risk and push it into Collection "selected_Departures"
  *@param dep_id = departure ID
  *@param stop_id = Stop ID
  */
async function add_selected_stop_as_taken(dep_id, stop_id) {

  var user = await get_logged_User()
  var object = {
    departure_id: dep_id,
    stop_id: stop_id,
    user: user[0].userID,
    infection_risk: "No"
  }

  $.ajax({
    url: "/selected_departures",
    method: "POST",
    data: object,
    success: function (result) {
      result;
    },
    error: function (err) { console.log(err) }
  });
}


/**
*
*@desc Creates a table on the HTML Site with all departures
*@param stop = all data from selected stop
*@param id = stop ID from selected Stop
*/
async function create_table_departures(stop, id) {
  var table = document.getElementById("Table2");
  for (var i = 0; i < stop[0].departures.length; i++) {
    update_dep_table(stop[0].departures[i], i, id, table) // creates Row at Table
  }

  create_list_of_ratio_buttons_departures(stop[0].departures, id) //creates list of ratio buttons with departure data
}




/**
*@desc  creates row at departures table
*@param stop = stop data from selected Stop
*@param i = index of for loop
*@param id = id from selected stop
*@param table = HTML Site Table Object
*
*
*
*/
function update_dep_table(stop, i, id, table) {

  var row = table.insertRow();  //insert a row
  row.setAttribute("class", "rt2");



  var richtungstext = row.insertCell();
  richtungstext.innerHTML = stop.transport.headsign;
  richtungstext.setAttribute("class", "t2"); //insert cell at the row variable with the bearing of the line

  var linienid = row.insertCell();
  linienid.innerHTML = stop.transport.name;
  linienid.setAttribute("class", "t2"); //insert cell at the row variable with with the lines number

  var ankunftszeit = row.insertCell();
  ankunftszeit.innerHTML = convert_time(stop.time);
  ankunftszeit.setAttribute("class", "t2");//insert cell at the row variable with the arrival time


  var internID = row.insertCell();
  internID.innerHTML = i;

  internID.setAttribute("class", "t2");//insert cell at the row variable with the arrival time

  var stopID = row.insertCell();
  stopID.innerHTML = id;

  stopID.setAttribute("class", "t2");//insert cell at the row variable with the arrival time
}



