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
var Chan_2 = require("./Chan");
exports.Chan = Chan_2.default;
function makechan(name) {
    return new Chan_1.default(name);
}
exports.makechan = makechan;
function wait(chan) {
    return (cb) => {
        return {
            chan,
            fn: cb,
        };
    };
}
exports.wait = wait;
function select(...selectors) {
    return __awaiter(this, void 0, void 0, function* () {
        let index = -1;
        let resValue;
        let isReady = false;
        const promises = selectors.map((selector, i) => __awaiter(this, void 0, void 0, function* () {
            const value = yield selector.chan.get();
            if (index === -1) {
                index = i;
                resValue = value;
            }
            else {
                if (!isReady) {
                    selector.chan.unshift(value);
                }
                else {
                    selector.chan.put(value);
                }
            }
        }));
        yield Promise.race(promises);
        isReady = true;
        return yield selectors[index].fn(resValue);
    });
}
exports.select = select;
exports.default = makechan;
