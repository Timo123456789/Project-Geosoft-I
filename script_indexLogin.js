var IDDocs = 1;
var IDTravs = 1;


login_LoginHTML()



/**
*@desc creates User as Doctor
*@param  username_textfield = Value from Username_textfield
*@param  password_textfield = Value from password_textfield
*@param  IDDocs = ID for Doctors
*
*
*
*/

function createUserDoc() {

  var username_textfield = document.getElementById("Username").value;
  var password_textfield = document.getElementById("Password").value;
  if (required(username_textfield) == true && required(password_textfield) == true) {
    var result = {
      Username: username_textfield,
      Password: password_textfield,
      role: "doctor",
      userID: "D" + IDDocs,
    };
    IDDocs++;
    return new Promise(function (res, rej) {
      $.ajax({
        url: "/User",
        method: "POST",
        data: result,
        success: function (result) {
          res(result);
          document.getElementById("Username").value = "";
          document.getElementById("Password").value = "";
        },
        error: function (err) { console.log(err) }
      });
    })
  } else {
    window.alert("Please type something in Username and Password Textfield.");
  }





}

/**
*@desc creates User as Travellers
*@param  username_textfield = Value from Username_textfield
*@param  password_textfield = Value from password_textfield
*@param  IDTravs = ID for Travellers
*
*
*
*/

function createUserTrav() {
  var username_textfield = document.getElementById("Username").value;
  var password_textfield = document.getElementById("Password").value;
  if (required(username_textfield) == true && required(password_textfield) == true) {
    var result = {
      Username: username_textfield,
      Password: password_textfield,
      role: "traveller",
      userID: "T" + IDTravs,
    };
    IDTravs++;
    return new Promise(function (res, rej) {
      $.ajax({
        url: "/User",
        method: "POST",
        data: result,
        success: function (result) {
          res(result);
          document.getElementById("Username").value = "";
          document.getElementById("Password").value = "";
        },
        error: function (err) { console.log(err) }
      });
    })
  }
  else {
    window.alert("Please type something in Username and Password Textfield.");
  }
}



/**
*@desc function to check a textfield for strings
*@param  inputtx = String of Textfield
*@source https://www.w3resource.com/javascript/form/non-empty-field.php //minor changes 
*
*
*/
function required(inputtx) {
  if (inputtx == " ") {
    return false;
  }
  if (inputtx.length == 0) {
    return false;
  }
  return true;
} 





/**
*@desc logged User in Server,check if User exists and  add Data from Logged User in Collection "Logged_User"
*@param  username_textfield = Value from Username_textfield
*@param  password_textfield = Value from password_textfield
*@param  temp = Object with values from textfields for Get Request at Server at Search 
*
*
*/

function login() {
  var username_textfield = document.getElementById("Username").value;
  var password_textfield = document.getElementById("Password").value;
  var temp = {
    Username: username_textfield,
    Password: password_textfield
  };
  return new Promise(function (res, rej) {
    $.ajax({
      url: "/User",
      method: "GET",
      data: temp,
      success: function (result) {
        res(result);
        if (result[0] != undefined) {  //Function find a User with password and username
          if (result[0].role == "traveller") { //check if users role is Traveller
            save_User_trav(result); //save user at Collection logged_user
          } else if (result[0].role == "doctor") { //check if users role is doctor
            save_User_Doc(result);//save user at Collection logged_user
          }
        }
        else {
          window.alert("Please type something in Username and Password Textfield or check password and username!");
        }
      },
      error: function (err) { console.log(err) }
    });
  })
}




/**
 * No Window Alerts Version
*@desc logged User in Server,check if User exists and  add Data from Logged User in Collection "Logged_User"
*@param  username_textfield = Value from Username_textfield
*@param  password_textfield = Value from password_textfield
*@param  temp = Object with values from textfields for Get Request at Server at Search 
*
*
*/
function login_LoginHTML() {
  // console.log("Button funktioniert");
 
   var username_textfield = document.getElementById("Username").value;
   var password_textfield = document.getElementById("Password").value;
 
   var temp = {
     Username: username_textfield,
     Password: password_textfield
   };
 
   return new Promise(function (res, rej) {
     $.ajax({
       url: "/User",
       method: "GET",
       data: temp,
       success: function (result) {
         res(result);
         if (result[0] != undefined) {
           if (result[0].role == "traveller") {
             save_User_trav(result);      
           } else if (result[0].role == "doctor") {
             save_User_Doc(result);
           }
         }
         else {
          // window.alert("Please type something in Username and Password Textfield or check password and username!");
         }
       },
       error: function (err) { console.log(err) }
     });
   })
 
 }


 /**
*@desc saves User as Traveller at Collection "logged_User", connection to next HTML Site
*@param  loggedUser = Object with Parameters
*
*
*/
function save_User_trav(loggedUser){
var result = loggedUser[0];
    return new Promise(function (res, rej) {
      $.ajax({
        url: "/logged_User",
        method: "POST",
        data: result,
        success: function (result) {
          res(result);
          document.getElementById("Username").value = "";
          document.getElementById("Password").value = "";
          window.location.href = 'http://localhost:3000/index_B';  //Connection to Index_b.html
        },
        error: function (err) { console.log(err) }
      });
    })
  } 


   /**
*@desc saves User as Doctor at Collection "logged_User", connection to next HTML Site
*@param  loggedUser = Object with Parameters
*
*
*/
  function save_User_Doc(loggedUser){
    var result = loggedUser[0];
        return new Promise(function (res, rej) {
          $.ajax({
            url: "/logged_User",
            method: "POST",
            data: result,
            success: function (result) {
              res(result);
              document.getElementById("Username").value = "";
              document.getElementById("Password").value = "";
              window.location.href = 'http://localhost:3000/index_doc'; //Connection to index_doc.html
            },
            error: function (err) { console.log(err) }
          });
        })
      } 



/**
*@desc delete all Values in Collection "logged_User"
*/
 function delete_logged_User(){

  return new Promise(function (res, rej) {
    $.ajax({
      url: "/logged_User",
      method: "DELETE",
      
      success: function (result) {
        res(result);
        
      },
      error: function (err) { console.log(err) }
    });
  })
} 


 



