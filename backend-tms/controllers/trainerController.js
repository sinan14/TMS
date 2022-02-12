const multer = require('multer');
const Trainer = require('../models/trainerModel');
const factory = require('../controllers/handlerFactory');
const AppError = require('../utils/appError');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/req');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    req.body.photo = `user-${Date.now()}.${ext}`;
    cb(null, req.body.photo);
  }
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});
exports.uploadPhoto = upload.single('photo');

exports.getTrainers = factory.getAll(Trainer);
exports.createTrainer = factory.createOne(Trainer);
exports.getTrainer = factory.getOne(Trainer);
exports.editTrainer = factory.updateOne(Trainer);
exports.deleteTrainer = factory.deleteOne(Trainer);
