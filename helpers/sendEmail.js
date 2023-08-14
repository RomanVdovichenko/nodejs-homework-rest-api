const nodemailer = require('nodemailer');

require('dotenv').config();

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'romanvdovichenko@meta.ua',
    pass: process.env.PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
    const email = { ...data, from: 'romanvdovichenko@meta.ua' };
    await transporter.sendMail(email);
    return true;
}

module.exports = sendEmail;