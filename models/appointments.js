const mongoose = require('mongoose');

Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  userData: {
    type: Array,
    default: [],
  },
  hospital_id: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
});

module.exports = all_appointments = mongoose.model(
  'all_appointments',
  AppointmentSchema
);
