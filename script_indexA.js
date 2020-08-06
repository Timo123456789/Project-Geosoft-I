var layergroup = L.layerGroup();

var t = document.getElementById("geojsontextarea");;
var map = L.map('mapbootstrap', { layers: [layergroup] }).setView([51.9574469, 7.5719975], 13);//7.5719975,51.9574469  51.957, -0.09

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

getLocation()
//create_Table_Busstops(test);

//GETLOCATION

/**
*@desc return the user location via Callback function "showPosition"
*@param  t = temporary variable
*
*
*/

async function getLocation() {

  console.log("getlocation");
  if (navigator.geolocation) {
 navigator.geolocation.getCurrentPosition(showPosition);



  } else {
    window.alert( "Geolocation is not supported by this browser.");
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
  
  console.log("Darstellen");
  L.marker(change(actpos)).addTo(map) 
getbusstops(actpos);





}

/**
  *@desc change values of an array
  */

 function change(array) {  
    var temp;
    temp = array[0];
    array[0] = array[1];
    array[1] = temp;
    return array;
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




 function getbusstops(actpos){
  console.log("Button funktioniert"+actpos);
  console.log("URL:      "+"https://transit.hereapi.com/v8/departures?in="+actpos+";r=500");
return new Promise(function (res, rej) {
    $.ajax({
      url: "https://transit.hereapi.com/v8/departures?in="+actpos+";r=500",
      method: "GET",
      data :{
        apiKey: HERE_API_KEY
      },
      success: function (result) {
    
        console.log(JSON.stringify(result));
      create_Table_Busstops(result)
      },
      error: function (err) { console.log(err) }
    });
  })

}


 function create_Table_Busstops(busstops) {
  
console.log("create");
console.log(JSON.stringify(busstops));
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
 
  L.marker([busstops.boards[i].place.location.lat,busstops.boards[i].place.location.lng]).addTo(map).bindPopup(busstops.boards[i].place.name); //set Marker for Bus stop

 


}

create_list_of_ratio_buttons(busstops);

  
}

function create_list_of_ratio_buttons(busstops) {
  document.getElementById("radiobuttons").innerHTML = "";



  var list = document.getElementById("radiobuttons");
  for (var i = 0; i < busstops.boards.length; i++) {
    var x = document.createElement("INPUT");
    var y = document.createElement("LABEL");
    y.innerHTML = busstops.boards[i].place.name;


    x.setAttribute(
      "type",
      "radio",
    );
    x.setAttribute(
      "name",
      "value"
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


 async function check_radios_on_main_site() {
  //console.log("tabellen leergeputzt?")
  clean_tables();
 

  var radios = document.getElementsByName("value");
 
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked == true) {
      //zeige Destination an

    }

  }

}


/**
  *@desc function to clean rows of all tables
  */

 function clean_tables() {

  console.log("cleantables");
  $(".rt1").html(" ");
  $(".rt2").html(" ");


}
