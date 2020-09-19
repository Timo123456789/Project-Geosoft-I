////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Methoden für alle HTML Seiten////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////User Functions////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
*@desc function check if one User is logged
*/
async function check_logged_User() {
  var logged = await get_logged_User();
  if (logged[0] != undefined) {
   // window.alert("Login Sucess");
  }
  else {
    window.alert("Login failed");
    window.location.href = 'http://localhost:3000/index_Login';
  }

}



/**
*@desc function to request logged User
*/
async function get_logged_User() {
  return new Promise(function (res, rej) {
    $.ajax({
      url: "/logged_User",
      method: "GET",
      success: function (result) {
        res(result);
      },
      error: function (err) { console.log(err) }
    });
  })
}


/**
*@desc function to delete User from "logged_User" Collection
*/
function delete_logged_User() {
  return new Promise(function (res, rej) {
    $.ajax({
      url: "/logged_User",
      method: "DELETE",
      success: function (result) {
        res(result);
        window.location.href = 'http://localhost:3000/index_Login';

      },
      error: function (err) { console.log(err) }
    });
  })
}





/**
*@desc function to get all stops from a User by using TravellerID to identiefier
*/
async function get_stops_by_UserID(logged_User) {
  var idobject = {
    id: logged_User
  }
  return new Promise(function (res, rej) {
    $.ajax({
      url: "/selected_departures",
      method: "GET",
      data: idobject,
      success: function (result) {
        return res(result);
      },
      error: function (err) { console.log(err) }
    });
  })

}




/**
*@desc function to get all User Data from "User" Collection by given Traveller ID
*/
async function get_User_by_TravID(TravID) {
  var idobject = {
    UserID: TravID

  }
  return new Promise(function (res, rej) {
    $.ajax({
      url: "/search_by_UserID",
      method: "GET",
      data: idobject,
      success: function (result) {
        return res(result);
      },
      error: function (err) { console.log(err) }
    });
  })
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////DB Funktionen/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
*@desc function to set Markers at given stops position, creates another Marker when departure is marked as infected
*/
async function set_Markers_at_stop_positions(stops_from_User) {
  for (var i = 0; i < stops_from_User.length; i++) {
    var stop_data = await get_stop_data(stops_from_User[i].stop_id);
    var stop_coordinates = get_stop_coordinates(stop_data);
    if (stops_from_User[i].infection_risk == "yes") {
      L.marker(stop_coordinates, { icon: redIcon }).addTo(map).bindPopup("Name: " + stop_data[0].name + "<br>" + "Type: " + stop_data[0].type + "<br>" + "ID: " + stop_data[0].id);
    }
    else {
      L.marker(stop_coordinates, { icon: greenIcon }).addTo(map).bindPopup("Name: " + stop_data[0].name + "<br>" + "Type: " + stop_data[0].type + "<br>" + "ID: " + stop_data[0].id);
    }
  }
}


/**
*@desc function to get one Stop by ID from "all_busstops_and_Departures" Collection
*/
function get_one_stop_with_ID(idobject) {
  return new Promise(function (res, rej) {
    $.ajax({
      url: "/all_busstops_and_departures",
      method: "GET",
      data: idobject,
      success: function (result) {
        res(result);
      },
      error: function (err) { console.log(err) }
    });
  })

}


/**
*@desc function to check if Collection "all_busstops_and_departures" is Empty 
*/
async function Coll_all_busstops_and_Departures_isEmpty() {
  //console.log("testhead")
  return $.ajax({
    url: "/is_empty_all_busstops_and_departures",
    method: "GET",
    success: function (result) {
      return result;
    },
    error: function (err) { console.log(err) }
  });

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////alles weitere/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
*@desc function to abbreviate time string
*/
function convert_time(time) {
  var str = time;
  var time_pos_begin = str.indexOf("T");
  var time_pos_end = str.lastIndexOf(":");
  var time_short = str.slice(time_pos_begin + 1, time_pos_end - 3) 
  return time_short;
}

/**
  *@desc function to clean rows of all tables
  */
function clean_tables() {
  $(".rt2").html(" ");
}


/**
*@desc function to return stop coordinates as array from given stop data
*/
function get_stop_coordinates(stop_data) {
  var coor = [stop_data[0].lat, stop_data[0].lng];
  return coor;

}


/**
*@desc function to get stop data, creates a object for async db Function
*/
async function get_stop_data(id) {
  var idobject = {
    id: id,
  }
  var stop = await get_one_stop_with_ID(idobject);
  return stop;
}


/**
*@desc declaration of Green Marker for Leafleat Map
*@Source  https://github.com/pointhi/leaflet-color-markers/tree/master/img
*/
var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


/**
*@desc declaration of Red Marker for Leafleat Map
*@Source  https://github.com/pointhi/leaflet-color-markers/tree/master/img
*/
var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

