const express = require('express');
const router = express.Router();
const UserController = require('../controller/user.controller');
const { checkAuth } = require('../middleware/auth.middleware');

router.get('/', [checkAuth], UserController.findAll);
router.post('/', [checkAuth], UserController.create);
router.get('/:id', [checkAuth], UserController.findById);
router.put('/:id', [checkAuth], UserController.update);
router.delete('/:id', [checkAuth], UserController.delete);

module.exports = router;