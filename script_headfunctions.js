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

async function check_logged_User() {
    var logged = await get_logged_User();
    //console.log(logged);
    if (logged[0] != undefined) {
      window.alert("Login Sucess");
  
  
  
    }
    else {
  
      window.alert("Login failed");
      window.location.href = 'http://localhost:3000/index_Login';
    }
  
  }



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

async function Coll_all_busstops_and_Departures_isEmpty(){
//console.log("testhead")
 return $.ajax({
    url: "/is_empty_all_busstops_and_departures",
    method: "GET",
    success: function (result) {
     // console.log(" res(result");
     // console.log( result);
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