const express = require('express');
const searchController = require('./../controllers/searchController');

const router = express.Router();

router.get('/name/:keyword', searchController.searchByName);
router.get('/course/:keyword', searchController.searchByCourse);
router.get('/skill/:keyword', searchController.searchBySkill);
router.get('/type-of-employment/:keyword', searchController.searchByEmployment);
router.get('/common/:keyword', searchController.commonSearch);

module.exports = router;
