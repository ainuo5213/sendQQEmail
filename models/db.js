"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
exports.default = mongoose_1.createConnection('mongodb://127.0.0.1:27017/testUser', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//# sourceMappingURL=db.js.map