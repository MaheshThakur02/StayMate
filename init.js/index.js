const mongoose = require('mongoose');

const initdata= require("./data.js");

const Listing = require("../models/listing.js");

const MONGO_url = "mongodb://127.0.0.1:27017/staymate";

main()
.then(()=>{
    console.log("db connected")
}).catch((err)=>{
    console.log(err);
});




async function main(){
    await mongoose.connect(MONGO_url);
}


 const initdb = async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data initialised ") ; 
 }


initdb();