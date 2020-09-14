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

  //generar html
  const generarHTML = (archivo, opciones = {}) => {
    //metodo de pug para importar html, dirname toma la carpeta actual
    // podemos enviar cualquier correo  con esto, no solo la contraseña
    const html = pug.renderFile(`${__dirname}/../Views/emails/${archivo}.pug`, opciones);
    // juice agrega los estilos lineales de html
    return juice(html);
  }

  exports.enviar = async (opciones) => {
    // send mail with defined transport object
    let info = {
      from: '"Flames 👻" <no-reply@gmail.com>', // sender address
      to: opciones.usuario.email, // list of receivers
      subject: opciones.subject, // Subject line
      text: "Buena prro?", // plain text body
      html: generarHTML(opciones.archivo, opciones) // el parametro opciones solo, es para que reconozca resetUrl en el pug
      }; 

    // sendEmail no soporta async, para eso utilizamos util para que pueda usar metodos promise
    const enviarEmail = util.promisify(transport.sendMail, transport);
    return enviarEmail.call(transport, info)
  }

