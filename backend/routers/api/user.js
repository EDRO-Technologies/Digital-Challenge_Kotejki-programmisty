'use strict';

const user = require('../../database/controllers/user');

const Router = require('express');
const router = new Router();

router.post('/users', user.create);
router.get('/users', user.getAll);
router.get('/users/:id', user.get);
// router.put('/users/:id', user.update);
// router.delete('/users/:id', user.delete);

module.exports = router;