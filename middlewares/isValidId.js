const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
    const { contactid } = req.params;
    if (!isValidObjectId(contactid)) {
        next(HttpError(400, `${contactid} is not valid id`))
    }
    next();
}

module.exports = isValidId;