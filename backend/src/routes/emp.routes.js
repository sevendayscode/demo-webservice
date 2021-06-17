const express = require('express');
const router = express.Router();
const empController = require('../controller/emp.controller');
const { checkAuth } = require('../middleware/auth.middleware');

router.get('/', [checkAuth], empController.findAll);
router.post('/', [checkAuth], empController.create);
router.get('/:empno', [checkAuth], empController.findById);
router.put('/:empno', [checkAuth], empController.update);
router.delete('/:empno', [checkAuth], empController.delete);

module.exports = router;