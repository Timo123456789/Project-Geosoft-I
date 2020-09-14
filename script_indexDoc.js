var layergroup = L.layerGroup();

var t = document.getElementById("geojsontextarea");;
var map = L.map('mapbootstrap', { layers: [layergroup] }).setView([51.9574469, 7.5719975], 13);//7.5719975,51.9574469  51.957, -0.09

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


check_logged_User()
main_indexDocSite()

function main_indexDocSite(){
console.log("foo!!!!!!!!!")
create_User_Table()

}


async function create_User_Table() {

 
  //Variablendeklaration
  var table = document.getElementById("User_Table");






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
  


}