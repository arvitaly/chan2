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
const _1 = require(".");
it("race should resolve first channel and remove other waiters", () => __awaiter(this, void 0, void 0, function* () {
    const chan1 = _1.makechan();
    const chan2 = _1.makechan();
    const chan3 = _1.makechan();
    const selectPromise = _1.select(chan1.wait((value) => value), chan2.wait((value) => value));
    chan1.put("chan1Value");
    chan2.put("chan2Value");
    expect(yield selectPromise).toBe("chan1Value");
    expect(yield chan2.get()).toBe("chan2Value");
    chan3.put("chan3Value");
    expect(yield chan3.get()).toBe("chan3Value");
}));
