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
exports.commonSearch = catchAsync(async (req, res, next) => {
  const regex = new RegExp(req.params.keyword, 'i');
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
  const features = new APIFeatures(Trainer.find(findKey), req.query)
    .limitFields()
    .paginate();
  const doc = await features.query;
  let docs = [];
  const countDocuments = new APIFeatures(
    Trainer.countDocuments(findKey),
    req.query
  ).count();
  const count = await countDocuments.query;
  const userIdsFromDocs = doc.map(e => e.user._id);
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
  // console.log(userIds);
  // console.log(userIdsFromDocs);
  // console.log(idsCombined);
  const uniqIds = idsCombined.filter(function(v, _, a) {
    return a.indexOf(v).toString() === a.lastIndexOf(v).toString();
  });
  // console.log(uniqIds);
  // console.log(uniqIds.length);
  if (uniqIds.length) {
    docs = await new APIFeatures(
      Trainer.find({
        status: 'approved',
        user: { $in: uniqIds }
      }),
      req.query
    )
      .limitFields()
      .paginate().query;
  }
  const arr = [...doc, ...docs];

  // const arr123 = await arr.filter(
  //   (v, i, a) =>
  //todo json stringify worked here
  //     a.findIndex(t => t._id.toString() === v._id.toString() === i
  // )

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    nos2: arr.length,
    count,
    arr
  });
});
exports.searchByName = catchAsync(async function(req, res) {
  const regex = new RegExp(req.params.keyword, 'i');
  const userIds = await new APIFeatures(
    User.find(
      {
        $or: [{ fname: regex }, { lname: regex }]
      },
      { _id: 1 }
    ),
    req.query
  ).paginate().query;
  const doc = await Trainer.find({
    status: 'approved',
    user: { $in: userIds }
  });
  // console.log(doc);
  res.status(200).json({
    status: 'success',
    nos: doc.length,
    data: doc
  });
});
