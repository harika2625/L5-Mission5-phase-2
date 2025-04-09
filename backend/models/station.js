const mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  fuel_price: {
    type: Number,
    required: true,
  },
  fuel_type: {
    type: String,
    required: true,
  },
});
const StationModel = mongoose.model("Station", StationSchema);
module.exports = StationModel;
