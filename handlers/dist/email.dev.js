"use strict";

// nodemailer
var nodemailer = require('nodemailer');

var pug = require('pug');

var juice = require('juice');

var htmlToText = require('html-to-text'); // este viene desde la version 8 de node


var util = require('util');

var emailConfig = require('../config/email'); //con esto manda los correos transport


var transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    // generated ethereal user
    pass: emailConfig.pass // generated ethereal password

  }
}); //generar html

var generarHTML = function generarHTML(archivo) {
  var opciones = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  //metodo de pug para importar html, dirname toma la carpeta actual
  // podemos enviar cualquier correo  con esto, no solo la contraseña
  var html = pug.renderFile("".concat(__dirname, "/../Views/emails/").concat(archivo, ".pug"), opciones); // juice agrega los estilos lineales de html

  return juice(html);
};

exports.enviar = function _callee(opciones) {
  var html, text, info, enviarEmail;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          html = generarHTML(opciones.archivo, opciones); // el parametro opciones solo, es para que reconozca resetUrl en el pug

          text = htmlToText.fromString(html); // send mail with defined transport object

          info = {
            from: '"Flames 👻" <no-reply@gmail.com>',
            // sender address
            to: opciones.usuario.email,
            // list of receivers
            subject: opciones.subject,
            // Subject line
            text: text,
            html: html
          }; // sendEmail no soporta async, para eso utilizamos util para que pueda usar metodos promise

          enviarEmail = util.promisify(transport.sendMail, transport);
          return _context.abrupt("return", enviarEmail.call(transport, info));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};