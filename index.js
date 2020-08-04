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
        //connect do databases "User" and "Route"
        app.locals.db = await app.locals.dbConnection.db("User");
        app.locals.db = await app.locals.dbConnection.db("Route");
        console.log("Using db: " + app.locals.db.databaseName);
        //app.locals.db.collection("items").drop( (err,delOK) => {if(delOK) console.log("collections cleared")} );


    }
    catch (error) {
        console.dir(error)
        setTimeout(connectMongoDb, 3000)
    }
}
//Start connecting
connectMongoDB()


// listen on port 3000
app.listen(port,
    () => console.log(`HTML Site listening at http://localhost:${port}`)
)