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
it("when waiters added in queue should resolved as queues", () => __awaiter(this, void 0, void 0, function* () {
    const chan = new Chan_1.default();
    const getPromise = chan.get();
    const getPromise2 = chan.get();
    chan.put("test");
    chan.put("test2");
    expect(yield getPromise).toBe("test");
    expect(yield getPromise2).toBe("test2");
}));
it("when 2 values in queue should return as queue", () => __awaiter(this, void 0, void 0, function* () {
    const chan = new Chan_1.default();
    chan.put("value1");
    chan.put("value2");
    expect(yield chan.get()).toBe("value1");
    expect(yield chan.get()).toBe("value2");
}));
