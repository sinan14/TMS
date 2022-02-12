const Allocation = require('../models/allocationModel');
const factory = require('../controllers/handlerFactory');

exports.getAllocations = factory.getAll(Allocation);
exports.createAllocation = factory.createOne(Allocation);
exports.viewAllocation = factory.getOne(Allocation);
exports.editAllocation = factory.updateOne(Allocation);
exports.getAllocationsByTrainerId = factory.getAll(Allocation);
exports.deleteAllocation = factory.deleteOne(Allocation);

//specific allocations query contains Trainer=trainerId this will filter allocations assigned to that trainer
// exports.getAllocationsByTrainerId = catchAsync(async (req, res, next) => {
//   const features = new APIFeatures(
//     Allocation.find({ Trainer: req.params.trainerId }),
//     req.query
//   )
//     .filter()
//     .sort()
//     .limitFields()
//     .paginate();
//   const allocations = await features.query;
//   //   const totalDocs = await new APIFeatures(
//   //     Allocation.countDocuments(),
//   //     req.query
//   //   ).count().query;

//   const queryObj = {
//     ...req.query
//   };
//   const excludedFields = ['page', 'sort', 'limit', 'fields'];
//   excludedFields.forEach(el => delete queryObj[el]);

//   // 1B) Advanced filtering
//   //todo build the query
//   let queryStr = JSON.stringify(queryObj);
//   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
//   // const totalDocs = await Model.estimatedDocumentCount({ filterVar: parameter });
//   const query = Allocation.countDocuments(JSON.parse(queryStr));
//   const totalDocs = await query;

//   // SEND RESPONSE
//   res.status(200).json({
//     status: 'success',
//     results: allocations.length,
//     totalDocs,
//     data: {
//       allocations
//     }
//   });
// });
