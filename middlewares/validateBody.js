const { HttpError } = require('../helpers');

const validateBody = schema => {
    const func = (req, res, next) => {

        const keys = Object.keys(req.body);
        if (keys.length === 0) {
            next(HttpError(400, 'missing fields'));
        }

        const {error} = schema.validate(req.body, { abortEarly: false});
        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    }
    return func;
}

module.exports = validateBody;