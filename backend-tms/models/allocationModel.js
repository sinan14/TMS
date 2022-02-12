const mongoose = require('mongoose');
// const Trainer = require('./trainerModel');
const AllocatedSchema = new mongoose.Schema({
  Trainer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Trainer',
    required: [true, 'Allocation must belong to a Trainer.']
  },

  //todo diffrent fields
  startdate: {
    type: Date,
    required: [true, 'please provide start date']
  },
  enddate: {
    type: Date,
    required: [true, 'please provide end date']
  },
  time: {
    type: String,
    required: [true, 'please provide time of allocation']
  },
  course: {
    type: String,
    required: [true, 'please provide course name']
  },
  courseid: {
    type: String,
    required: [true, 'please provide courseId']
  },
  batchid: {
    type: String,
    required: [true, 'please provide batch']
  },
  meetinglink: {
    type: String,
    required: [true, 'please provide meeting link']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});
AllocatedSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'Trainer'
  });
  next();
});
module.exports = mongoose.model('AllocatedData', AllocatedSchema);
