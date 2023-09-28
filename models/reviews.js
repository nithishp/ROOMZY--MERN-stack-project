const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
    roomid:{
        type : String,
        // required : true
    },
    userid:{
        type : String,
        // required : true
    },
    review:{

        type : String,
        // required : true
    },
    rating:{
        type : Number,
        // required : true
    },
},
{
    timestamps : true,
}

    )
    const reviewmodel = mongoose.model("reviews",reviewSchema);
module.exports = reviewmodel;
