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
        app.locals.db.collection("Route").drop( (err,delOK) => {if(delOK) console.log("collection Route cleared")} );

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

//Make leafleatheat accessible voer localhost:3000/leaflet-heap
app.use('/leaflet-draw', express.static(__dirname + '/node_modules/leaflet-draw/dist'));

//Send index.html on request to "/"
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index_Login.html')
})


//Send index.html on request to "/"
app.get('/index_A', (req,res) => {
    res.sendFile(__dirname + '/index_A.html')
})
app.get('/index_Doc', (req,res) => {
    res.sendFile(__dirname + '/index_Doc.html')
})

// listen on port 3000
app.listen(port,
    () => console.log(`HTML Site listening at http://localhost:${port}`)
)



app.post("/User", (req, res) => {
    // insert item
    console.log("insert User " + JSON.stringify(req.body));
    app.locals.db.collection('User').insertOne(req.body, (error, result) => {
        if (error) {
            console.dir(error);
        }
        res.json(result);
    });
});

//Sucht einen bestimmten User mit Passwort und gibt ihn zurück
app.get("/User", (req, res) => {
    //Search for all items in mongodb

   
    console.log(req.query);
   
  
    
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
