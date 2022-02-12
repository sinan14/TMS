const express = require('express');
const trainerController = require('../controllers/trainerController');

const router = express.Router();
router
  .route('/')
  .get(trainerController.getTrainers)
  .post(trainerController.uploadPhoto, trainerController.createTrainer);
router
  .route('/:id')
  .get(trainerController.getTrainer)
  .patch(trainerController.editTrainer)
  .delete(trainerController.deleteTrainer);

module.exports = router;
