const mongoose = require("mongoose");

Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  cell: {
    type: String,
    required: true,
  },
  appointmentsBooked: {
    type: Array,
    default: [],
  },
  appointmentsAvailable: {
    type: Array,
    default: [],
  },
});

module.exports = hospitals = mongoose.model("hospitals", hospitalSchema);
