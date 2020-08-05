var layergroup = L.layerGroup();

var t = document.getElementById("geojsontextarea");;
var map = L.map('mapbootstrap', { layers: [layergroup] }).setView([51.9574469, 7.5719975], 13);//7.5719975,51.9574469  51.957, -0.09

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

getLocation();

//GETLOCATION

/**
*@desc return the user location via Callback function "showPosition"
*@param  t = temporary variable
*
*
*/

function getLocation() {

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




/*GET https://transit.hereapi.com/v8/departures
    ?in=41.900138,12.501924;r=500


    https://transit.hereapi.com/v8/stations
    ?in=41.90123,12.50091


    
Authorization: Bearer */
return new Promise(function (res, rej) {
    $.ajax({
      url: "https://transit.hereapi.com/v8/departures?in=41.900138,12.501924;r=500",
      method: "GET",
      data: result,
      success: function (result) {
        res(result);
        console.log(JSON.stringify(result));
      },
      error: function (err) { console.log(err) }
    });
  })

