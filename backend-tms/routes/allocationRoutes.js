const express = require('express');
const allocationController = require('../controllers/allocationController');

const router = express.Router();
router.get('/', allocationController.getAllocations);
router
  .route('/:trainerId')
  .get(allocationController.getAllocationsByTrainerId)
  .post(allocationController.createAllocation);
//todo get all allocations of a trainer
router
  .route('/:trainerId/:id')
  .get(allocationController.viewAllocation)
  .patch(allocationController.editAllocation)
  .delete(allocationController.deleteAllocation);
//get all allocation on server

module.exports = router;
