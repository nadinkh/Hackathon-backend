require('dotenv').config();
const mongoose = require('mongoose');

const db = process.env.MONGODB_KEY;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });

    console.log('🔵 MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    // exit process if cannot connect!
    process.exit(1);
  }
};

module.exports = connectDB;
