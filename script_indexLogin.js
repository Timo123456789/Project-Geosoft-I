var IDDocs = 1;
var IDTravs = 1;


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

function createUserTrav() {



  var username_textfield = document.getElementById("Username").value;
  var password_textfield = document.getElementById("Password").value;

  if (required(username_textfield) == true && required(password_textfield) == true) {

    var result = {
      Username: username_textfield,
      Password: password_textfield,
      role: "traveller",
      RouteID: [],
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


function required(inputtx) {
  if (inputtx == " ") {
    return false;
  }
  if (inputtx.length == 0) {
    return false;
  }
  return true;
} //Source: https://www.w3resource.com/javascript/form/non-empty-field.php //minor changes 







function login() {
  console.log("Button funktioniert");

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
        console.log(res);
        console.log(result);
        if (result[0] != undefined) {
          if (result[0].role == "traveller") {
            console.log("traveller eingeloggt");
            window.location.href = 'http://localhost:3000/index_B';
          } else if (result[0].role == "doctor") {
            console.log("doctor eingeloggt");
            window.location.href = 'http://localhost:3000/index_doc';
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

