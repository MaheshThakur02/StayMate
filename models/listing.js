const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const listingschema = new Schema({
    title : {
        type : String,
        required : true
             },
    description : String,
    image : {
        type:String,
        default:"https://unsplash.com/photos/a-hotel-room-with-a-bed-and-a-desk-xZKEqleFdnk",
        // we use set function for setting image of the db 
      set : (v)=> v==="" ? "https://unsplash.com/photos/a-hotel-room-with-a-bed-and-a-desk-xZKEqleFdnk":v,
             },
    price : {
        type : Number,
         
            },
    location : {
        type:String,
       
               } ,
     country :{
        type:String,
     },
     reviews:[{
        type:Schema.Types.ObjectId,
        ref:"review",
     }],
});

const Listing =  mongoose.model("Listing",listingschema);
// we have to use this in app.js we have created export


module.exports=Listing;