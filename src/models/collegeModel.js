const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  fullName: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  logoLink: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },

  isDeleted: {
    type: Boolean,
    default: false
  }


}, { timestamps: true });

module.exports = mongoose.model('CollegeDB', collegeSchema);
