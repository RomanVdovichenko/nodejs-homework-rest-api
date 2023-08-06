const {Contact} = require('../models/contact');

const { ctrlWrapper, HttpError } = require('../helpers/index');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5, favorite = null} = req.query;
  const skip = (page - 1) * limit;
  if (favorite !== null) {
    const result = await Contact.find({ owner, favorite });
    res.status(200).json(result);
  }
    const result = await Contact.find({owner}, '-createdAt -updatedAt', {skip, limit: Number(limit)}).populate('owner', 'email subscription');
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
  const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
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