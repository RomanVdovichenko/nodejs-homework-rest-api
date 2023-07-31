const { HttpError } = require('../helpers');

const validateBody = schema => {
    const func = (req, res, next) => {
        const { name, email, phone } = req.body;
        let value = '';
        const keys = Object.keys(req.body);
        if (keys.length === 0) {
            next(HttpError(400, 'missing fields'));
        }
        if (!name) {
            value = 'name';
        }
        if (!email) {
            value = 'email';
        }
        if (!phone) {
            value = 'phone';
        }
        if (value) {
            next(HttpError(400, `missing required ${value} field`))
        }
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    }
    return func;
}

module.exports = validateBody;