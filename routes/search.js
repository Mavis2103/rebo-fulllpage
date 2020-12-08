const express = require('express');
const router = express.Router();

const searchController = require('../controller/search/search');

router.get('/:role/:id', searchController.searchInDB);
router.route('/:value_from_input').post(searchController.searchNoDB).get(searchController.sendResults);
module.exports = router;
