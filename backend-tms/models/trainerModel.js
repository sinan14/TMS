const mongoose = require('mongoose');
const Allocation = require('./allocationModel');

const trainerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'please provide parent user']
    // unique: [true, 'User can apply once in a year']
  },
  photo: {
    type: String,
    default: 'default.jpg'
  },
  address: {
    type: String,
    required: [true, 'please provide address']
  },
  phno: {
    type: String,
    required: [true, 'please provide phone number']
  },
  qual: {
    type: String,
    required: [true, 'please provide qualification']
  },
  skill: {
    type: String,
    required: [true, 'please provide skills']
  },
  comp: {
    type: String
  },
  desgn: {
    type: String,
    required: [true, 'please provide desired designation']
  },
  course: {
    type: String,
    required: [true, 'please provide atleast one course']
  },

  status: {
    type: String,
    enums: ['approved', 'inactive', 'not-approved'],
    default: 'not-approved'
  },
  typeOfemployment: {
    type: String,
    enums: ['Internal,Emapanel']
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});
trainerSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

  this.populate({
    path: 'user',
    select: 'fname lname email'
  });
  next();
});

//TODO DELETE ALL ASSOCIATED docs in allocation collection on deleting trainer
trainerSchema.post('findOneAndDelete', async id => {
  const res = await Allocation.deleteMany({ Trainer: id });
  console.log(res);
});
// userSchema.comments.remove({userId: removedUserId})
// userSchema.post("findOneAndDelete", async function (user) {
//   if (user.comments.length) {
//     const res = await Comment.deleteMany({ _id: { $in: user.comments } });
//     console.log(res);
//   }
// });
module.exports = mongoose.model('Trainer', trainerSchema);
