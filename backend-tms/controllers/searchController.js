const Trainer = require('./../models/trainerModel');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');
const factory = require('./handlerFactory');

exports.searchBySkill = factory.backendSearch(Trainer, ['skill']);
exports.searchByCourse = factory.backendSearch(Trainer, ['course']);
exports.searchByEmployment = factory.backendSearch(Trainer, [
  'typeOfemployment'
]);
exports.searchByName = catchAsync(async function(req, res) {
  const regex = new RegExp(req.params.searchKey, 'i');
  const userIds = await new APIFeatures(
    User.find(
      {
        $or: [{ fname: regex }, { lname: regex }]
      },
      { _id: 1 }
    ),
    req.query
  ).paginate().query;
  const trainers = await Trainer.find({
    status: 'approved',
    user: { $in: userIds }
  });
  // console.log(trainers);
  res.status(200).json({
    status: 'success',
    nos: trainers.length,
    data: trainers
  });
});
exports.commonSearch = catchAsync(async (req, res, next) => {
  const regex = new RegExp(req.params.searchKey, 'i');
  const findKey = {
    $and: [
      {
        status: 'approved',
        $or: [
          { skillset: regex },
          { course: regex },
          { typeOfemployment: regex }
        ]
      }
    ]
  };
  const countDocuments = new APIFeatures(
    Trainer.countDocuments(findKey),
    req.query
  ).count();
  const count = await countDocuments.query;

  const features = new APIFeatures(Trainer.find(findKey), req.query)
    .limitFields()
    .paginate();
  const trainers = await features.query;

  const userIdsFromDocs = trainers.map(e => e.user._id);
  // const userIds = await User.distinct('_id', filter);
  // const userIds = await User.find(filter, { _id: 1 });
  const filter = {
    $or: [{ fname: regex }, { lname: regex }]
  };

  const userIds = await new APIFeatures(
    User.find(filter, { _id: 1 }),
    req.query
  ).paginate().query;
  const idsCombined = [...userIds, ...userIdsFromDocs];
  let trainersWithName = [];
  // console.log(userIds);
  // console.log(userIdsFromDocs);
  // console.log(idsCombined);
  const uniqIds = idsCombined.filter(function(v, _, a) {
    return a.indexOf(v).toString() === a.lastIndexOf(v).toString();
  });
  // console.log(uniqIds);
  // console.log(uniqIds.length);
  if (uniqIds.length) {
    trainersWithName = await new APIFeatures(
      Trainer.find({
        status: 'approved',
        user: { $in: uniqIds }
      }),
      req.query
    )
      .limitFields()
      .paginate().query;
  }
  const arr = [...trainers, ...trainersWithName];

  // //todo json stringify worked here
  //   const arr123 = arr.filter(
  //     (v, i, a) =>
  //       a.findIndex(t => JSON.stringify(t._id) === JSON.stringify(v._id) === i
  //   );
  // console.log(arr123)
  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    nos2: arr.length,
    count,
    arr: JSON.stringify
  });
});
