const express = require('express');
const ctrl = require('../../controllers/contacts');
const {validateBody, isValidId, validateFavorite} = require('../../middlewares');
const {schemas} = require('../../models/contact');
const router = express.Router();

router.get('/', ctrl.getAllContacts);

router.get('/:contactId', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.addContact);

router.put('/:contactId', isValidId, validateBody(schemas.addSchema), ctrl.updateContactById);

router.patch('/:contactId/favorite', isValidId, validateFavorite(schemas.updateFavoriteSchema), ctrl.updateStatusContact);

router.delete('/:contactId', isValidId, ctrl.deleteContact);

module.exports = router
