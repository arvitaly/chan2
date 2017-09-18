"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toChan(promise) {
    promise.status = "pending";
    return promise;
}
class Chan {
    constructor(name) {
        this.name = name;
        this.values = [];
        this.waiters = [];
    }
    get() {
        const first = this.values.shift();
        let resolve;
        if (first) {
            const pr = toChan(new Promise((r) => {
                resolve = r;
            }));
            pr.status = "resolved";
            pr.value = first;
            resolve(first);
            return pr;
        }
        const promise = toChan(new Promise((r) => resolve = r));
        this.waiters.push({ resolve, promise });
        return promise;
    }
    put(value) {
        const firstWaiter = this.waiters.shift();
        if (firstWaiter) {
            firstWaiter.promise.status = "resolved";
            firstWaiter.promise.value = value;
            firstWaiter.resolve(value);
        }
        else {
            this.values.push(value);
        }
    }
    unshift(value) {
        this.values.unshift(value);
    }
    wait(cb) {
        return {
            chan: this,
            fn: cb,
        };
    }
    clear() {
        this.values = [];
        this.waiters = [];
    }
}
exports.default = Chan;
