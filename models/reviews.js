const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema(
  {
    roomid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      // required : true
    },
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required : true
    },
    comment: {
      type: String,
      // required : true
    },
    rating: {
      type: Number,
      // required : true
    },
  },
  {
    timestamps: true,
  }
);
const reviewmodel = mongoose.model("Review", reviewSchema);
module.exports = reviewmodel;
