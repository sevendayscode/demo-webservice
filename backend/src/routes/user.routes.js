const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');

router.get('/', UserController.findAll);
router.post('/', UserController.create);
router.get('/:id', UserController.findById);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.delete);

module.exports = router;