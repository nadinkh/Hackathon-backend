const mongoose = require('mongoose');

Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: [6, '6 or more characters'],
    required: true,
  },
  cell: {
    type: String,
    required: true,
  },
  bloodType: {
    type: String,
    required: true,
  },
  previousDonor: {
    type: Boolean,
    required: true,
  },
  healthInsurance: {
    type: String,
    required: true,
  },
  IDNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    default: 'donor',
  },
  appointments: {
    type: Array,
    default: [],
  },
});

module.exports = users = mongoose.model('users', userSchema);
