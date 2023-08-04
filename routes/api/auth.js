const express = require('express');
const ctrl = require('../../controllers/auth');
const authenticate = require('../../middlewares/authenticate');
const validateBody = require('../../middlewares/validateBody');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.current);
router.post('/logout', authenticate, ctrl.logout);
router.patch('/:userId/subscription', authenticate, validateBody(schemas.subscriptionSchema), ctrl.subscription);

module.exports = router;