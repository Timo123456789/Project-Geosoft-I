
/**
 *@desc 'QUnit test for API
 *


QUnit.test("Check API Request",
    function (assert) {
       assert.ok(true)
    },
); */



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

QUnit.test("check logged User",
    async function (assert) {
      var temp = await test_get_logged_User()
      console.log(temp);
      if (temp == 200){assert.ok(true)}else{assert.ok(false)} 

    },


);







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