const express = require('express');
const searchController = require('./../controllers/searchController');

const router = express.Router();

router.get('/name/:searchKey', searchController.searchByName);
router.get('/course/:searchKey', searchController.searchByCourse);
router.get('/skill/:searchKey', searchController.searchBySkill);
router.get(
  '/type-of-employment/:searchKey',
  searchController.searchByEmployment
);
router.get('/common/:searchKey', searchController.commonSearch);

module.exports = router;
