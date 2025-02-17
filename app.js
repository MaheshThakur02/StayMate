const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require("path");
let url = "mongodb://127.0.0.1:27017/staymate";
// exporting listing schema from listing .js 
const Listing = require("./models/listing.js")
const {listingschema} =require('./schema.js')
const review = require("./models/review.js")
const methodoverride = require('method-override');
const ejsMate = require('ejs-mate');

const ExpressError = require("./utils/ExpressError.js");
const wrapasync = require('./utils/wrapasync.js');


app.set("viewengine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const validatelisting = (req,res,next)=>{
    let {error}=  listingschema.validate(req.body);
    if(error){
        let errormsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errormsg);
    }else{
        next();
    }
};


main()
.then(()=>{
console.log("db connected");
}).catch
((err)=>{
console.log(err)
});

// to connect db
async function main(){
    await mongoose.connect(url);
}
// for setting port 
app.listen("8080",()=>{
    console.log("server is listening at port 8080");
});

app.get("/", wrapasync((req,res)=>{
 res.render("../views/listing/home.ejs");
}));

app.get("/listing/new",  (req,res) =>{
res.render("../views/listing/new.ejs") ;
 });

app.post("/listing", validatelisting,wrapasync(async (req,res)=>{

   let listing = req.body.listing;
        const newListing= new Listing(req.body.listing);
        await newListing.save();
        console.log(Listing);
        res.redirect("/listing");}
  

))

app.get("/listing",wrapasync( async (req,res)=>{
   const allListing =  await Listing.find({});
 res.render("../views/listing/index.ejs",{allListing});
}));





app.get("/listing/:id",wrapasync( async (req,res)=>{
   let {id}  = req.params;
   const listing = await Listing.findById(id);
   res.render("../views/listing/show.ejs",{listing});
}));

app.get("/listing/:id/edit",  wrapasync(async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("../views/listing/edit.ejs",{listing});
    }));


    //update route 
app.put("/listing/:id",  validatelisting,wrapasync( async  (req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
}
))

// dellete route 

app.delete("/listing/:id",wrapasync( async (req,res)=>{
    let {id} =req.params;
    let deletelisting = await Listing.findByIdAndDelete(id);
    console.log(deletelisting);
    res.redirect("/listing");
}))

// reviews 
app.post("/listing/:id/reviews",async(req,res)=>{
let listing = await Listing.findById(req.params.id);
let newreview = new review(req.body.review);
listing.reviews.push(newreview);
await newreview.save();
await listing.save();
console.log(newreview);
console.log("review saved");
res.send("review saved !");

})




app.all("*",(req,res,next)=>{
    next( new ExpressError(404,"page not found"));
});

app.use((err,req,res,next)=>{
    let{statuscode=500,message="something went wrong"}=err;
    res.status(statuscode).render("../views/listing/error.ejs", {message});
    // res.status(statuscode).send(message);
});
// app.use((err,req,res,next)=>{

// });






// app.get("/testlisting", async (req,res)=>{
//     let samplelisting = new Listing({
//         tittle:"My New Villa",
//         description: "by the beach",
//         price : 1200,
//         location:"luckhnow,up",
//         country:"India",
//     })

//  await   samplelisting.save().then(()=>{
//     console.log("saved data");
//  }).catch((err)=>{
//     console.log(err);
//  });

// res.send("successful testing ") ;

// })


