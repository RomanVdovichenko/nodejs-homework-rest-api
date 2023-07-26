const contacts = require('../models/contacts');

const { HttpError, ctrlWrapper } = require('../helpers/index');

const getAllContacts = async (_, res) => {
    const result = await contacts.listContacts();
    res.status(200).json(result);
}

const getContactById = async (req, res) => {
    const {contactId} = req.params
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found')
    }
    res.status(200).json(result);
}

const addContact = async (req, res) => {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
}

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json({"message": "contact deleted"});
}

const updateContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
}

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContactById: ctrlWrapper(updateContactById),
}