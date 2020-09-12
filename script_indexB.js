var layergroup = L.layerGroup();

var t = document.getElementById("geojsontextarea");;
var map = L.map('mapbootstrap', { layers: [layergroup] }).setView([51.9574469, 7.5719975], 13);//7.5719975,51.9574469  51.957, -0.09

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


check_logged_User()
main_indexB()



//MAIN FUNCTION
async function main_indexB (){
var logged_User = get_logged_User();

var stops_from_User = await get_stops_from_logged_User(logged_User);
console.log("stops_from_User");
console.log(stops_from_User);
console.log(stops_from_User.stop_id);

set_Markers_at_stop_positions(stops_from_User)

}











async function set_Markers_at_stop_positions(stops_from_User){
    for (var i = 0; i<stops_from_User.length;i++){
      var stop_data =   await get_stop_data(stops_from_User[i].stop_id);
      console.log("stop_data");
      console.log(stop_data);
    var stop_coordinates = get_stop_coordinates(stop_data);
        L.marker(stop_coordinates).addTo(map).bindPopup(stop_data[0].name + "<br>" + "ID: " + stop_data[0].id);
    }



}



function get_stop_coordinates(stop_data){
var coor = [stop_data[0].lat,stop_data[0].lng];
return coor;

}




async function get_stop_data(id){
    var idobject = {
        id: id,
      }
    var stop = await get_one_stop_with_ID(idobject);
    //console.log(" one stop");
    return stop;
}




async function get_stops_from_logged_User(logged_User){
    var idobject ={
        User: logged_User

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