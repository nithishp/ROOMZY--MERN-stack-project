const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema({
  rating: {
    type: Number,
    //   required: true,
    //   min: 1,
    //   max: 5,
  },
  comment: {
    type: String,
    //   required: true,
  },
});
const roomschema = mongoose.Schema(
  {
    name: {
      type: String,
      //   required: true,
    },
    maxcount: {
      type: Number,
      //   required: true,
    },
    phonenumber: {
      type: Number,
      //   required: true,
    },
    rentperday: {
      type: Number,
      //   required: true,
    },
    imageurls: [],
    currentbookings: [],
    
    type: {
      type: String,
      //   required: true,
    },
    location: {
      type: String,
      //   required: true,
    },
    description: {
      type: String,
      //   required: true,
    },
  },
  { timestamps: true }
);

const RoomModel = mongoose.model("Room", roomschema);
// const RatingModel = mongoose.model("Rating", reviewSchema);
module.exports = RoomModel;
// module.exports = RatingModel;
