const {MongoClient} =  require('mongodb');
const mongoose = require ('mongoose');
const express = require('express');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
// Start the app by listening on the default
// Heroku port

// async function main() {
//     const uri = "mongodb+srv://Hamza:353C98e0!@nitrixwork.mmxzo.mongodb.net/?retryWrites=true&w=majority"

//     const client = new MongoClient(uri);
//     try {
//     await client.connect();

//     await  listDatabases(client);
//     } catch (e)
//     {
//         console.error(e);
//     } finally 
//     {
//         await client.close();
//     }

// }
// main().catch(console.error);

// async function listDatabases(client) {
//     const databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");
//     databasesList.databases.forEach(db => {
//         console.log(`- ${db.name}`);
//     })
// }

// var MongoClient = require('mongodb').MongoClient;
// const dbURI = "mongodb+srv://Hamza:353C98e0!@nitrixwork.mmxzo.mongodb.net/?retryWrites=true&w=majority";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   //Find all documents in the customers collection:
//   dbo.collection("hijri-calendar").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });
// });
const dbURI = "mongodb+srv://Hamza:353C98e0!@nitrixwork.mmxzo.mongodb.net/?retryWrites=true&w=majority";
const calendarSchema = {
    
    hDate: String,
    hMonth: String,
    gDate: String,
    gMonth: String,
    gDay: String,
    cities: Array,
    ismak: Array,
    asr: Array,
    dhuhr: Array,
    ischa: Array,
    maghreb: Array,
    schams: Array

}

const Calendar = mongoose.model('Calendar',calendarSchema);
mongoose.connect(dbURI,{useNewUrlParser: true,useUnifiedTopology: true}).then((result)=>{
	//listen for requests
app.listen(3000);
}).catch((err) => {
	console.log('there is an error');
})
console.log('something is happening here');

app.get('/all-rows',(req,res) => {
    // Calendar.find({}, function(calendar){
    //     res.send(calendar);
    //     console.log(calendar);
    // })
	Calendar.find().then( result => {
        console.log(result)
        res.send(JSON.stringify(result))

    })
    // {
    //     console.log(calendar)
    //     res.send(calendar);
    //     console.log(calendar)
    // }
    // )
    // database.collection('calendar').find({}).toArray((err, result) => {
    //     if(err) throw err
    //     res.send(result)
    // })
});

app.listen(process.env.PORT || 8080)