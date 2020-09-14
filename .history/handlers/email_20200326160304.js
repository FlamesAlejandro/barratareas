// nodemailer
const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
// este viene desde la version 8 de node
const util = require('util');
const emailConfig = require('../config/email');

//con esto manda los correos transport
let transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.pass // generated ethereal password
    }
  });

// send mail with defined transport object
let info = {
    from: '"Flames 👻" <no-reply@gmail.com>', // sender address
    to: "flameskazu@gmail.com", // list of receivers
    subject: "Buena ✔", // Subject line
    text: "Buena prro?", // plain text body
    html: "<b>Hola mundo?</b>" // html body
    }; 

transport.sendMail(info);