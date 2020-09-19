/*
* Projektaufgabe, Abgabeterim: 21.09.2020, Geosoft 1, SoSe 2020
* @author {Timo Lietmeyer}   matr.Nr.: {459169}
* @author {Judith Bresser}   matr.Nr.: {459956}
*/

//**various jshint configs**
// jshint esversion: 8
// jshint browser: true
// jshint node: true
// jshint -W117
// jshint -W083
"use strict";

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

check_logged_User()  //function to check if user is logged
main_indexB()   // run main method
var infected = false;



/**
*@desc Main Method, check infection risk of logged User and set Markers at taken stops from logged User, creates Table with all taken departures and stops from logged user
*@param  logged_user = Object with Parameters from "logged_User" Collection
*@param  stops_from_User = Array with Objects which includes all taken departures and stops from logged User
*
*
*/
async function main_indexB() {
  var logged_User = await get_logged_User();
  var stops_from_User = await get_stops_by_UserID(logged_User[0].userID);
  infection_check(stops_from_User)      //check if one taken departure is marked as "infected"
  set_Markers_at_stop_positions(stops_from_User)    //set marker at stop positions
  make_table(stops_from_User)         //creates table with all taken departures from logged User
}




/**
*@desc run for loop to check all given stops by infection risk, if infection risk detected turns it a Window Alert
*@param  stops = array of object which includes all datas of taken stops from logged User
*
*
*/
function infection_check(stops) {
  for (var i = 0; i < stops.length; i++) {
    if (stops[i].infection_risk == "yes") {
      window.alert("Infection Risk detected");
      infected = true;
      break;
    }
  }
}




/**
*@desc async function to creates Table on HTML Site, for Loop to loop about all data in stops array
*@param stops = Array of Objects with taken stop data
*@param stop_data = Object with data from selected Stop
*
*/
async function make_table(stops) {
  var table = document.getElementById("Table2");
  for (var i = 0; i < stops.length; i++) {
    var idobject = {
      id: stops[i].stop_id,
    }
    var stop_data = await get_one_stop_with_ID(idobject);
    make_row(stop_data[0], table, stops, i); //creates row in table element

  }





}

/**
*@desc creates row at table object with given paramters
*@param  data = Object with Bus Stop Data
*@param  table = Table Object at HTML Site
*@param  stops = Array of Object with taken Stop data from logged User
*@param  i = Index of For Loop
*
*
*/
function make_row(data, table, stops, i) {
  var row = table.insertRow();  //insert a row
  row.setAttribute("class", "rt1");



  var line1 = row.insertCell() //Name of Stop
  line1.innerHTML = data.name;
  line1.setAttribute("class", "t1");

  var line2 = row.insertCell(); //Type of Stop
  line2.innerHTML = data.type;
  line2.setAttribute("class", "t1");

  var line3 = row.insertCell(); //ID of Stop
  line3.innerHTML = data.id;
  line3.setAttribute("class", "t1");

  var line4 = row.insertCell() //Direction
  line4.innerHTML = data.departures[stops[i].departure_id].transport.headsign;
  line4.setAttribute("class", "t1");

  var line5 = row.insertCell(); //Line Number
  line5.innerHTML = data.departures[stops[i].departure_id].transport.name;
  line5.setAttribute("class", "t1");


  var line6 = row.insertCell(); //Time
  line6.innerHTML = convert_time(data.departures[stops[i].departure_id].time);
  line6.setAttribute("class", "t1");

  var line7 = row.insertCell(); //Departure ID
  line7.innerHTML = stops[i].departure_id;
  line7.setAttribute("class", "t1");

  var line8 = row.insertCell(); //Infection Risk
  line8.innerHTML = stops[i].infection_risk;
  line8.setAttribute("class", "t1");

}
