const express = require('express');
const router = express.Router();

const movieController = require('../controllers/tvController');
const initializeMongo = require('../services/initializeMongo');

router.use(initializeMongo());

router.get('/', movieController.getData);
router.post('/store', movieController.store);
router.delete('/destroy/:id', movieController.destroy);
router.put('/update/:id', movieController.update);

module.exports = router
