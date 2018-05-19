const express = require('express');
const router = express.Router();
const stories = require('./stories')

router.use('/nodejsnews', stories);

module.exports = router
