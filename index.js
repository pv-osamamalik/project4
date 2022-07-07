const {MongoClient} =  require('mongodb');
const mongoose = require ('mongoose');
const express = require('express');
const cors = require('cors');
const router = express.Router();
const http = require('http');
const app = express();
// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));
app.use(cors());

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

app.use(router);

const port = 3000;
const address = '0.0.0.0';

const server = http.createServer(app);

server.listen(port, address, () => {
  console.log(`listening on port ${port}`);
});