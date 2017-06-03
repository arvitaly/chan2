"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Chan_1 = require("./Chan");
function makechan(name) {
    return new Chan_1.default(name);
}
exports.makechan = makechan;
exports.default = makechan;
