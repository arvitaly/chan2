class Chan<T> {
    protected values: T[] = [];
    protected waiters: Array<(value: T) => any> = [];
    constructor(protected name?: string) { }
    public async get(): Promise<T> {
        const first = this.values.shift();
        if (first) {
            return first;
        }
        return new Promise<T>((resolve) => this.waiters.push(resolve));
    }
    public put(value: T) {
        const firstWaiter = this.waiters.shift();
        if (firstWaiter) {
            firstWaiter(value);
        } else {
            this.values.push(value);
        }
    }
}
export default Chan;
