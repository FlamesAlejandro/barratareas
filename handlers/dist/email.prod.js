"use strict";var nodemailer=require("nodemailer"),pug=require("pug"),juice=require("juice"),htmlToText=require("html-to-text"),util=require("util"),emailConfig=require("../config/email"),transport=nodemailer.createTransport({host:emailConfig.host,port:emailConfig.port,auth:{user:emailConfig.user,pass:emailConfig.pass}}),generarHTML=function(e,r){var t=1<arguments.length&&void 0!==r?r:{},i=pug.renderFile("".concat(__dirname,"/../Views/emails/").concat(e,".pug"),t);return juice(i)};exports.enviar=function(r){var t,i,a,n;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return t=generarHTML(r.archivo,r),i=htmlToText.fromString(t),a={from:'"Flames 👻" <no-reply@gmail.com>',to:r.usuario.email,subject:r.subject,text:i,html:t},n=util.promisify(transport.sendMail,transport),e.abrupt("return",n.call(transport,a));case 5:case"end":return e.stop()}})};