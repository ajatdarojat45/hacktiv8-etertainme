const express = require('express');
const router = express.Router();

const movieRouter = require('./movieRouter');
const tvRouter = require('./tvRouter');

router.use('/movie', movieRouter);
router.use('/tv', tvRouter);

module.exports = router;