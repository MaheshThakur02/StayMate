const mongoose =  require('mongoose');
const schema = mongoose.Schema;

const reviewSchema = new schema({
Comment: String,
Rating : {
    type:Number,min:1,max:5
},
CreatedAt: {
    type:Date,
    default:Date.now(),
},

});

module.exports= mongoose.model("review",reviewSchema);
