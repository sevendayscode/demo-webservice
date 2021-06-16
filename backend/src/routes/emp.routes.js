const express = require('express');
const router = express.Router();
const empController = require('../controller/emp.controller');

router.get('/', empController.findAll);
router.post('/', empController.create);
router.get('/:empno', empController.findById);
router.put('/:empno', empController.update);
router.delete('/:empno', empController.delete);

module.exports = router;