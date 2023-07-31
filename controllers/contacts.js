const {Contact} = require('../models/contact');

const { ctrlWrapper, HttpError } = require('../helpers/index');

const getAllContacts = async (_, res) => {
    const result = await Contact.find({}, '-createdAt -updatedAt');
    res.status(200).json(result);
}

const getContactById = async (req, res) => {
    const {contactId} = req.params
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, 'Not found')
    }
    res.status(200).json(result);
}

const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
}

const updateContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
}

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json(result);
}

const deleteContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.status(200).json({"message": "contact deleted"});
}

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
    deleteContact: ctrlWrapper(deleteContact),
}