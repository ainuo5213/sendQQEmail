"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
exports.port = +process.env.PORT || 3000;
exports.hostname = '127.0.0.1';
exports.callback = function () { return console.log("server is running on " + chalk_1.default.green(exports.hostname) + ":" + chalk_1.default.green(exports.port + '')); };
exports.url = 'mongodb://nodemailer:test1234@ds249137.mlab.com:49137/nodemailer-api1';
//# sourceMappingURL=config.js.map