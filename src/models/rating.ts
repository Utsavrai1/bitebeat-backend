import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  restaurtId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const Rating = mongoose.model("Rating", ratingSchema);
export default Rating;
