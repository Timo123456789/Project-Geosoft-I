var layergroup = L.layerGroup();

var t = document.getElementById("geojsontextarea");;
var map = L.map('mapbootstrap', { layers: [layergroup] }).setView([51.9574469, 7.5719975], 13);//7.5719975,51.9574469  51.957, -0.09

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var DepID = 0;

check_logged_User()
getLocation()

main_indexA()

async function main_indexA(actpos){
//var userpos = await getLocation();
L.marker(change(actpos)).addTo(map).bindPopup("User Position")
  getbusstops(actpos);

}


/**
*@desc return the user location via Callback function "showPosition"
*@param  t = temporary variable
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
*@desc callback function for "getLocation" function
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
  //console.log("Darstellen");
  //L.marker(change(actpos)).addTo(map).bindPopup("User Position")
 // getbusstops(actpos);





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




function getbusstops(actpos) {
 
 // console.log("URL:      " + "https://transit.hereapi.com/v8/departures?in=" + actpos + ";r=500");
  return new Promise(function (res, rej) {
    $.ajax({
      url: "https://transit.hereapi.com/v8/departures?in=" + actpos + ";r=500",
      method: "GET",
      data: {
        apiKey: HERE_API_KEY
      },
      success: function (result) {

       // console.log(JSON.stringify(result));
        create_Table_Busstops(result)
      },
      error: function (err) { console.log(err) }
    });
  })

}


async function create_Table_Busstops(busstops) {

 
  //Variablendeklaration
  var table = document.getElementById("Table");






  for (var i = 0; (i < busstops.boards.length); i++) {


    var row = table.insertRow();  //insert a row
    row.setAttribute("class", "rt1");




    var pointcloud = row.insertCell()
    pointcloud.innerHTML = busstops.boards[i].place.name;
    pointcloud.setAttribute("class", "t1"); //insert cell at the row variable with the pointcloud (point 2) value on place i of array array_of_objects

    var array_with_calculated_distances = row.insertCell();
    array_with_calculated_distances.innerHTML = busstops.boards[i].place.type; //insert cell at the row variable with the distance value on place i of array array_of_objects
    array_with_calculated_distances.setAttribute("class", "t1");

    var array_with_calculated_distances = row.insertCell();
    array_with_calculated_distances.innerHTML = busstops.boards[i].place.id; //insert cell at the row variable with the distance value on place i of array array_of_objects
    array_with_calculated_distances.setAttribute("class", "t1");






   

    L.marker([busstops.boards[i].place.location.lat, busstops.boards[i].place.location.lng]).addTo(map)
      .bindPopup(busstops.boards[i].place.name + "<br>" + "ID: " + busstops.boards[i].place.id); //set Marker for Bus stop




  }
  

  
  if (await Coll_all_busstops_and_Departures_isEmpty() == true) {

    create_Collection_of_all_stops_and_departures(busstops)
  }


  create_list_of_ratio_buttons(busstops);


}





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



function create_list_of_ratio_buttons(busstops) {
  document.getElementById("radiobuttons_stops").innerHTML = "";



  var list = document.getElementById("radiobuttons_stops");
  for (var i = 0; i < busstops.boards.length; i++) {
    var x = document.createElement("INPUT");
    var y = document.createElement("LABEL");
    y.innerHTML = busstops.boards[i].place.name + "(ID: " + busstops.boards[i].place.id + ")\n";



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
      busstops.boards[i].place.id
    );
    list.appendChild(x);
    list.appendChild(y);
  }

}
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
  *@desc Async Function to get the value of the checked radio buttons on the main site
  *@param radios = node list with all values from radio button list
  *@param jhalte = list of busstops
  */


async function check_stop_radios() {
  // console.log("tabellen leergeputzt?")
  // clean_tables();

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


async function check_departure_radios() {
 

  const rbs = document.querySelectorAll('input[name="value_departures"]');
 // console.log(rbs);
  let selected_Departure_ID;
  let selected_stop_ID;
  for (const rb of rbs) {
    if (rb.checked) {
      
      selected_Departure_ID = rb.attributes.departures_id.nodeValue;
      selected_stop_ID=rb.attributes.stop_id.nodeValue
    
add_selected_stop_as_taken(selected_Departure_ID,selected_stop_ID)

      


      break;
    }
  }


}


async function add_selected_stop_as_taken(dep_id, stop_id){
  var user = await get_logged_User()
  
    var object = {
departure_id: dep_id,
stop_id:stop_id,
user: user[0].userID,
infection_risk:""

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
*@desc Creates a table on the HTML Site
*@param array_of_objects, array with objects, which includes the lines and their departure and arrival times
*/

async function create_table_departures(stop, id) {

  //Variablendeklaration
  var table = document.getElementById("Table2");
 


 
  //console.log("id:" + id)
  //console.log("stop:" + stop)
 


  
  console.log(stop);
    for (var i = 0; i < stop[0].departures.length; i++) {

      
      update_dep_table(stop[0].departures[i],i,id,table)
     
    }
    
  create_list_of_ratio_buttons_departures(stop[0].departures, id)
  }
  



 










function update_dep_table(stop,i,id,table){
  
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





















////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////CODE FRIEDHOF////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/* var radios = document.getElementsByName("value");
 console.log("radios");
 console.log(radios);


  for (var i = 0; i < radios.length; i++) {
    console.log("for check");
    if (radios[i].checked == true) {

     console.log("t");
     var t = radios[i].value;
     console.log(t);
     var str = t.firstChild.data;
     var id_pos_begin = str.indexOf(":")
     var id_pos_end = str.indexOf(")")
     var id = str.slice(id_pos_begin+2,id_pos_end) //+2, um : zu entfernen
     console.log(id)
     var idobject ={
      id:id,

     }

       var departure_object=await get_one_stop_with_ID(idobject);
       console.log(departure_object);


    }

  }*/


  
/*function create_Collection_Departures(departures, id) {
  console.log(departures)
  console.log("id")
  console.log(id)
  var x = 0
  for (var i = 0; i < departures.length; i++) {
    // console.log(departures.length);
    console.log(i);
    result = {
      name: departures[i].transport.headsign,
      type: departures[i].transport.name,
      time: departures[i].time,
      stop_id: id,
      departure_id: i



    };
    x++;

    $.ajax({
      url: "/departures",
      method: "POST",
      data: result,
      success: function (result) {
        result;
      },
      error: function (err) { console.log(err) }
    });

  }

}


function get_one_departure_with_ID(id) {

  console.log("id")
  console.log(id)
  var idobject = {
    id: id
  }
  console.log(idobject);
  return new Promise(function (res, rej) {
    $.ajax({
      url: "/departures",
      method: "GET",
      data: idobject,
      success: function (result) {
        res(result);
        // console.log(res)
        // console.log(result)


      },
      error: function (err) { console.log(err) }
    });
  })

}




*/