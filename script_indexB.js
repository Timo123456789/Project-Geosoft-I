var layergroup = L.layerGroup();

var t = document.getElementById("geojsontextarea");;
var map = L.map('mapbootstrap', { layers: [layergroup] }).setView([51.9574469, 7.5719975], 13);//7.5719975,51.9574469  51.957, -0.09

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});



var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
//Quelle https://github.com/pointhi/leaflet-color-markers/tree/master/img

/*
var LeafIcon = L.Icon.extend({
options: {
shadowUrl: '',
iconSize:     [19, 47.5],
shadowSize:   [50, 64],
iconAnchor:   [11, 47],
shadowAnchor: [4, 62],
popupAnchor:  [-1.5, -38]
}
});


var bicon = new LeafIcon({iconUrl:'src/bus-stop-pointer.png'});
L.icon = function (options) {
return new L.Icon(options);
};




function screen_busstops(busstops){


if(typeof busstops==='string'){  busstops = JSON.parse(busstops);}

  for (var i = 0; i<busstops.features.length;i++){
//for (var i = 0; i<20;i++){

  L.marker(change(convert_GJSON_to_Array(busstops,i)),{icon: bicon}).addTo(map) // [51.5, -0.09] change(convert_GJSON_to_Array(busstops,i))
  .bindPopup("Bezeichnung:  "+busstops.features[i].properties.lbez+"  ("+busstops.features[i].properties.richtung+")"+"<br>"+"Nummer: "+busstops.features[i].properties.nr)
}


}*/
check_logged_User()
main_indexB()
var infected = false;



//MAIN FUNCTION
async function main_indexB() {
  var logged_User = await get_logged_User();
  /*console.log("SCRIPT logged_User");
  console.log(logged_User[0].userID);*/
  var stops_from_User = await get_stops_by_UserID(logged_User[0].userID);
  infection_check(stops_from_User)
  /*console.log("stops_from_User");
  console.log(stops_from_User);
  console.log(stops_from_User.stop_id);*/

  set_Markers_at_stop_positions(stops_from_User)
  make_table(stops_from_User)


}


function infection_check(stops) {
  console.log(stops);
  for (var i = 0; i < stops.length; i++) {

    if (stops[i].infection_risk == "yes") {

      window.alert("Infection Risk detected");
      infected = true;
      break;
    }

  }


}

async function make_table(stops) {
  //console.log("stops");
  //console.log(stops);
  var table = document.getElementById("Table2");
  for (var i = 0; i < stops.length; i++) {
    console.log("stop_data ID")
    console.log(stops[i].stop_id)
    var idobject = {
      id: stops[i].stop_id,
    }
    console.log("idobject");
    console.log(idobject);
    var stop_data = await get_one_stop_with_ID(idobject);
    console.log("one stop")
    console.log(stop_data)
    make_row(stop_data[0], table, stops, i);

  }





}




function make_row(data, table, stops, i) {
  var row = table.insertRow();  //insert a row
  row.setAttribute("class", "rt1");
  console.log("data in make row");
  console.log(data);



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
  line6.innerHTML = convert_time(data.departures[stops[i].departure_id].time); //insert cell at the row variable with the distance value on place i of array array_of_objects
  line6.setAttribute("class", "t1");

  var line7 = row.insertCell(); //Departure ID
  line7.innerHTML = stops[i].departure_id; //insert cell at the row variable with the distance value on place i of array array_of_objects
  line7.setAttribute("class", "t1");

  var line8 = row.insertCell(); //Infection Risk
  line8.innerHTML = stops[i].infection_risk; //insert cell at the row variable with the distance value on place i of array array_of_objects
  line8.setAttribute("class", "t1");

}


/*if(stops[i].infection_risk=="yes"){

    window.alert("Infection Risk detected");
    infected = true;
    break;
}*/
















