const express = require('express');
const router = express.Router();
const stories = require('./stories-controller')

router.use('/nodejsnews', stories);

module.exports = router
