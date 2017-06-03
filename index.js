"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Chan_1 = require("./Chan");
function makechan(name) {
    return new Chan_1.default(name);
}
exports.makechan = makechan;
function select(...chans) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = chans.map((chan) => chan.get());
        const value = yield Promise.race(promises);
        promises.map((promise, i) => {
            if (promise.status === "resolved") {
                chans[i].unshift(promise.value);
            }
        });
        return value;
    });
}
exports.select = select;
exports.default = makechan;
