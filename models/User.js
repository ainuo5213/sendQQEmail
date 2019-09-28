"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});
var User = db_1.default.model('User', userSchema, 'user');
exports.default = User;
//# sourceMappingURL=User.js.map