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
/*console.log("stops_from_User");
console.log(stops_from_User);
console.log(stops_from_User.stop_id);*/

set_Markers_at_stop_positions(stops_from_User)
make_table(stops_from_User)


}

async function make_table(stops){

    var table = document.getElementById("Table2");
    for (var i = 0; i<stops.length;i++){
        var stop_data =   await get_stop_data(stops[i].stop_id);
       /* console.log("stop_data, make tables")
        console.log(stop_data)*/
        make_row(stop_data[0], table, stops,i);

    }





}
   



function make_row(data, table, stops,i){
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

    var line8 = row.insertCell(); //Infection Risk
    line8.innerHTML = stops[i].infection_risk; //insert cell at the row variable with the distance value on place i of array array_of_objects
    line8.setAttribute("class", "t1");

}




async function set_Markers_at_stop_positions(stops_from_User){
    for (var i = 0; i<stops_from_User.length;i++){
      var stop_data =   await get_stop_data(stops_from_User[i].stop_id);
      console.log("stop_data");
      console.log(stop_data);
    var stop_coordinates = get_stop_coordinates(stop_data);
        L.marker(stop_coordinates).addTo(map).bindPopup("Name: "+stop_data[0].name + "<br>" +"Type: "+stop_data[0].type + "<br>" +"ID: " + stop_data[0].id);
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