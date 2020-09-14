"use strict";

exports.vardump = function (objeto) {
  return JSON.stringify(objeto, null, 2);
};