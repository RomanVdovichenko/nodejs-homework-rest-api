const express = require('express');
const ctrl = require('../../controllers/auth');
const { authenticate, validateBody, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);
router.get('/current', authenticate, ctrl.current);
router.post('/logout', authenticate, ctrl.logout);
router.patch('/subscription', authenticate, validateBody(schemas.subscriptionSchema), ctrl.subscription);
router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar);
router.get('/verify/:verificationToken', ctrl.verifyEmail);
router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail);

module.exports = router;