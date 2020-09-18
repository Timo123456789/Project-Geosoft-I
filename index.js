const express = require('express');
const mongodb = require('mongodb');
const port=3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/**
 * function which creates a Connection to MongoDB. Retries every 3 seconds if not connection could be established.
 */
async function connectMongoDB() {
    try {
        //connect to database server
        app.locals.dbConnection = await mongodb.MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true });
        //connect do database "MainDB"
        app.locals.db = await app.locals.dbConnection.db("MainDB");
        console.log("Using db: " + app.locals.db.databaseName);
       
      app.locals.db.collection("User").drop( (err,delOK) => {if(delOK) console.log("collection User cleared")} );
      app.locals.db.collection("all_busstops_and_departures").drop( (err,delOK) => {if(delOK) console.log("collection all_busstops_and_departures cleared")} );
       app.locals.db.collection("logged_User").drop( (err,delOK) => {if(delOK) console.log("collection logged_User cleared")} );
       app.locals.db.collection("selected_departures").drop( (err,delOK) => {if(delOK) console.log("collection selected departures cleared")} );

    }
    catch (error) {
        console.dir(error)
        setTimeout(connectMongoDb, 3000)
    }
}
//Start connecting
connectMongoDB()


//Make all Files stored in Folder "__dirname" accessible over localhost:3000/src
app.use('/src', express.static(__dirname + ''));

//Make Leaflet accessible over localhost:3000/leaflet
app.use('/leaflet', express.static(__dirname + '/node_modules/leaflet/dist'));

//Make jquery accessible over localhost:3000/jquery
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

//Make bootstrap accessible voer localhost:3000/bootstrap
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));

//Make leafleatheat accessible voer localhost:3000/leaflet-heap
app.use('/leaflet-heat', express.static(__dirname + '/node_modules/leaflet.heat/dist'));

//Make leafleatheat accessible voer localhost:3000/leaflet-draw
app.use('/leaflet-draw', express.static(__dirname + '/node_modules/leaflet-draw/dist'));

//Send index.html on request to "/"
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index_Login.html')
})




//Send index_Doc.html on request to "/index_Doc"
app.get('/index_Doc', (req,res) => {
    res.sendFile(__dirname + '/index_Doc.html')
})

//Send index_Login.html on request to "/index_Login"
app.get('/index_Login', (req,res) => {
    res.sendFile(__dirname + '/index_Login.html')
})

//Send index_Login.html on request to "/index_A"
app.get('/index_A', (req,res) => {
    res.sendFile(__dirname + '/index_A.html')
})

//Send index_Login.html on request to "/index_B"
app.get('/index_B', (req,res) => {
    res.sendFile(__dirname + '/index_B.html')
})

//Send index_Login.html on request to "/index_B"
app.get('/test', (req,res) => {
    res.sendFile(__dirname + '/index_Test.html')
})



// listen on port 3000
app.listen(port,
    () => console.log(`HTML Site listening at http://localhost:${port}`)
)

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////USER Functions////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
*@desc insert a User in Collection "User"
*@param  req.query = Object with Parameters
*
*
*
*/

app.post("/User", (req, res) => {
    // insert User
    console.log("insert User " + JSON.stringify(req.body));
    app.locals.db.collection('User').insertOne(req.body, (error, result) => {
        if (error) {
            console.dir(error);
        }
        res.json(result);
    });
});



/**
*@desc insert one User in Collection "logged_User"
*@param  req.query = Object with Parameters
*
*
*
*/


app.post("/logged_User", (req, res) => {
    // insert User
    console.log("logged User " + JSON.stringify(req.body));
    app.locals.db.collection('logged_User').insertOne(req.body, (error, result) => {
        if (error) {
            console.dir(error);
        }
        res.json(result);
    });
});

/**
*@desc search for a User by Users Password and Username, if they found no User with Password and Username they request all Users
*in Collection "User"
*@param  req.query = Object with Parameters
*
*
*
*/


app.get("/User", (req, res) => {
    if (req.query.Username != undefined && req.query.Password != undefined) {
        
        app.locals.db.collection('User').find(req.query).toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });
    }
    else {
        
        app.locals.db.collection('User').find().toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });

    }
});



/**
*@desc  search for a User by UserID in Collection "User"
*@param  req.query = Object with Parameters
*
*
*
*/

app.get("/search_by_UserID", (req, res) => {
    if (req.query.UserID != undefined) {  
        app.locals.db.collection('User').find({userID: req.query.UserID}).toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });
    }
});


/**
*@desc  request the logged User from Collection "logged_User"
*
*/

app.get("/logged_User", (req, res) => {   
        app.locals.db.collection('logged_User').find().toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });
});


/**
*@desc  deleted the logged User from Collection "logged_User"
*
*/

app.delete("/logged_User", (req, res) => { 
    app.locals.db.collection('logged_User').deleteOne(req.body, (error, result) => {
        if (error) {
            console.dir(error);
        }
        res.json(result);
    });
});


/**
*@desc  request all Users from Collection "Users" as Array
*
*/
app.get("/User", (req, res) => {
        app.locals.db.collection('User').find().toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });
});





////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Selected Stops/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
*@desc  add selected Departure to Collection "selected_departures" with Stop ID, User ID and Departure ID
*@param  req.query = Object with Parameters
*
*
*
*/


app.post("/selected_departures", (req, res) => {
    app.locals.db.collection('selected_departures').insertOne(req.body, (error, result) => {
        if (error) {
            console.dir(error);
        }
        res.json(result);
    });
});



/**
*@desc  search at Collection "selected_departures" by UserID and request all taken departures from User with this UserID,
*if they are no departures with this UserID, they request all selected departures
*@param  req.query = Object with Parameters
*
*
*
*/
app.get("/selected_departures", (req, res) => {
    if (req.query != undefined) {
        app.locals.db.collection('selected_departures').find({user:req.query.id}).toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });
    }
    else {
        app.locals.db.collection('selected_departures').find().toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });
        //console.log("else");

    }


});



/**
*@desc  update at Collection "selected_departures" by StopID and DepartureID the selected Values with infections_risk, begin_time and end_time,
*if they are no departures with this UserID, they request all selected departures
*@param  req.query = Object with identifier Parameters
*@param  newvalues = Object with to new Parameters
*
*
*
*/

app.put("/selected_departures", (req, res) => {
    req.query={
        Stopid:req.body.StopID,
        DepID:req.body.DepID
    }
    var newvalues ={ $set:{
        infection_risk:req.body.infection_risk,
        begin_time:req.body.begin_time,
        end_time:req.body.end_time}

    }
    app.locals.db.collection('selected_departures').updateMany({departure_id: req.query.DepID, stop_id:req.query.Stopid}, newvalues, function(err, res) {
        if (err) throw err;
        console.log("all selected Departures Updatet");
       
      });
});

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////All Busstops and Departures///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
*@desc  add all Departure to Collection "all_busstops_and_departures" 
*@param  req.query = Object with Parameters
*
*
*
*/

app.post("/all_busstops_and_departures", (req, res) => {
    app.locals.db.collection('all_busstops_and_departures').insertOne(req.body, (error, result) => {
        if (error) {
            console.dir(error);
        }
        res.json(result);
    });
});


/**
*@desc  search one Stop by StopID
*@param  req.query = Object with Parameters
*
*
*
*/
app.get("/all_busstops_and_departures", (req, res) => {
    if (req.query != undefined) {
        app.locals.db.collection('all_busstops_and_departures').find({id:req.query.id}).toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });
    }
    else {
        app.locals.db.collection('all_busstops_and_departures').find().toArray((error, result) => {
            if (error) {
                console.dir(error);
            }
            res.json(result);
        });
    }
});

/**
*@desc Check if Collection "all_busstops_and_departures" is Empty and request True or False
*
*
*
*/
app.get("/is_empty_all_busstops_and_departures", (req, res) => {
    app.locals.db.collection("all_busstops_and_departures").count(function (err, count) {
        if (!err && count === 0) {
            result = true;
        }
        else{
            result = false;
        }
       return res.json(result);
    });

});