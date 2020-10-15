const express = require('express');

const router = express.Router();
const library = require('../controller/myLibrary/library');

router.route('/')
  .get(library.show);
router.route('/create')
  .post(library.createFolder);
router.route('/delete/:id')
  .get(library.deleteFolder);
router.route('/browse/:id')
  .get(library.openFolder);
module.exports = router;
