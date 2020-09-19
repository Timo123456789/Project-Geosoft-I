
/**
 *@desc 'QUnit test for API
 *


QUnit.test("Check API Request",
    function (assert) {
       assert.ok(true)
    },
); */



/**
 *@desc 'QUnit test for API
 *
 */

QUnit.test("Check API Request",
function (assert) { 
  $.ajax({
  url: "https://transit.hereapi.com/v8/departures?in=" + [55.0052,42.000] + ";r=500",
  data: {
      apiKey: HERE_API_KEY
    }, 
    statusCode: {
      200: function (response) {
        //return true;
        assert.ok(true)
      },
      201: function (response) {
        assert.ok(true)
      },
      400: function (response) {
        assert.ok(false)
      },
      404: function (response) {
        assert.ok(false);
      }
    }
  
})
}
  
);




/**
*@desc  connect to Here API with data by token,js and starts create_Table_Busstops Function with requested Data
*@param  apiKey = API Key for HERE API
*@param  actpos = Coordinates for HERE API in a Array
*@param  data = data from Here API
*
*
*
*/
function Testgetbusstops() {
    return new Promise(function (res, rej) {
      $.ajax({
        url: "https://transit.hereapi.com/v8/departures?in=" + actpos + ";r=500",
        method: "GET",
        data: {
          apiKey: HERE_API_KEY
        },
        success: function (result) {
  res(result)
        },
        error: function (err) { console.log(err) }
      });
    })
  }


  /*

  $.ajax(serverUrl, {
   type: OutageViewModel.Id() == 0 ? "POST" : "PUT",
   data: dataToSave,
   statusCode: {
      200: function (response) {
         alert('1');
         AfterSavedAll();
      },
      201: function (response) {
         alert('1');
         AfterSavedAll();
      },
      400: function (response) {
         alert('1');
         bootbox.alert('<span style="color:Red;">Error While Saving Outage Entry Please Check</span>', function () { });
      },
      404: function (response) {
         alert('1');
         bootbox.alert('<span style="color:Red;">Error While Saving Outage Entry Please Check</span>', function () { });
      }
   }, success: function () {
      alert('1');
   },
});
  */