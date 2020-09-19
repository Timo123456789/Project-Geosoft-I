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

/** @description The Window.print() method starts the printing process
*               identical to the menu command for printing in the browser
*
*/

/* https://wiki.selfhtml.org/wiki/JavaScript/Window/print */
function druck() {
  window.print();
}

/** @description The Window.print() method starts the printing process
*               identical to the menu command for printing in the browser
*
*/

/**
*@desc convert point in GJSON Feature
*@param  i = temporary variable
*@param x = Feature Collection of GeoJSON
*
*/

/* https://www.w3schools.com/w3css/w3css_tabulators.asp */

function openCity(cityName) {
  var i;
  var x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(cityName).style.display = "block";
}
