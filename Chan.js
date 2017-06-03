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
class Chan {
    constructor(name) {
        this.name = name;
        this.values = [];
        this.waiters = [];
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const first = this.values.shift();
            if (first) {
                return first;
            }
            return new Promise((resolve) => this.waiters.push(resolve));
        });
    }
    put(value) {
        const firstWaiter = this.waiters.shift();
        if (firstWaiter) {
            firstWaiter(value);
        }
        else {
            this.values.push(value);
        }
    }
}
exports.default = Chan;
