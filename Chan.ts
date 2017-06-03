type ChanPromise<T> = Promise<T> & {
    status?: string;
    value?: any;
    error?: any;
};
interface IWaiter<T> {
    promise: ChanPromise<T>;
    resolve: (value: T) => any;
}
function toChan<T>(promise: Promise<T>): ChanPromise<T> {
    (promise as any).status = "pending";
    return promise;
}
class Chan<T> {
    protected values: T[] = [];
    protected waiters: Array<IWaiter<T>> = [];
    constructor(protected name?: string) { }
    public get(): ChanPromise<T> {
        const first = this.values.shift();
        let resolve: any;
        if (first) {
            const promise = toChan(new Promise((r) => {
                resolve = r;
            }));
            promise.status = "resolved";
            promise.value = first;
            resolve(first);
            return promise;
        }
        const promise = toChan(new Promise<T>((r) => resolve = r));
        this.waiters.push({ resolve, promise });
        return promise;
    }
    public put(value: T) {
        const firstWaiter = this.waiters.shift();
        if (firstWaiter) {
            firstWaiter.promise.status = "resolved";
            firstWaiter.promise.value = value;
            firstWaiter.resolve(value);
        } else {
            this.values.push(value);
        }
    }
    public unshift(value: T) {
        this.values.unshift(value);
    }
    public wait<S>(cb: (value: T) => S) {
        return {
            chan: this,
            fn: cb,
        };
    }
}
export default Chan;
