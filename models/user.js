const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('@hapi/joi');

const emailReqexp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    match: emailReqexp,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: "",
  }
}, { versionKey: false, timestamps: true });

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().pattern(emailReqexp).required()
    .messages({ 'any.required': `missing required email field` }),
  password: Joi.string().min(6).required()
    .messages({ 'any.required': `missing required password field` }),
});

const loginSchema = Joi.object({
  email: Joi.string().required()
    .messages({ 'any.required': `missing required email field` }),
  password: Joi.string().required()
    .messages({ 'any.required': `missing required password field` }),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid('pro', 'starter', 'business').required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
};

const User = model('user', userSchema);

module.exports = {
    User,
    schemas,
};