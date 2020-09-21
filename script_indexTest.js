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
*@desc QUnit test for API
*
*/

QUnit.test("Check API Request",async function (assert) {
  var res = await connectAPI()
  console.log(res);
  if (res == 200){assert.ok(true)}else{assert.ok(false)}
}
);



/**
*@desc QUnit test for check logged User Function
*
*/

QUnit.test("check logged User",
async function (assert) {
  var temp = await test_get_logged_User()
  console.log(temp);
  if (temp == 200){assert.ok(true)}else{assert.ok(false)}

},


);




/**
*@desc QUnit test for get all User Data Function
*
*/

QUnit.test("get all User Function",
async function (assert) {
  var temp = await test_get_User()
  console.log(temp);
  if (temp == 200){assert.ok(true)}else{assert.ok(false)}

},


);




/**
*@desc temp function for test.html
*
*/


async function connectAPI(){

  var t ;

  await $.ajax({

    url: "https://transit.hereapi.com/v8/departures?in=" + [50.0000,48.000] + ";r=500",
    method: "GET",
    data: {
      apiKey: HERE_API_KEY
    },
  }).done(  function(rs, textStatus, xhr) {
    console.log(xhr.getResponseHeader('X-CUSTOM-HEADER'));
    console.log(xhr.status);
    t = xhr.status


  });

  return t;

}

/**
*@desc temp function for test.html
*
*/
async function test_get_logged_User(){

  var t ;

  await $.ajax({

    url: "/logged_User",
    method: "GET",

  }).done(  function(rs, textStatus, xhr) {
    console.log(xhr.getResponseHeader('X-CUSTOM-HEADER'));
    console.log(xhr.status);
    t = xhr.status


  });

  return t;

}


/**
*@desc temp function for test.html
*
*/
async function test_get_User(){

    var t ;
  
    await $.ajax({
  
      url: "/User",
      method: "GET",
  
    }).done(  function(rs, textStatus, xhr) {
      console.log(xhr.getResponseHeader('X-CUSTOM-HEADER'));
      console.log(xhr.status);
      t = xhr.status
  
  
    });
  
    return t;
  
  }
  
