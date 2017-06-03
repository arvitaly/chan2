import Chan from "./Chan";
export function makechan<T>(name?: string) {
    return new Chan<T>(name);
}
interface ISelector<T> {
    chan: Chan<T>;
    fn: (value: T) => any;
}
export function wait<T>(chan: Chan<T>) {
    return (cb: (value: T) => any): ISelector<T> => {
        return {
            chan,
            fn: cb,
        };
    };
}
export async function select(...selectors: Array<ISelector<any>>): Promise<any> {
    let index = -1;
    let resValue: any;
    let isReady = false;
    const promises = selectors.map(async (selector, i) => {
        const value = await selector.chan.get();
        if (index === -1) {
            index = i;
            resValue = value;
        } else {
            if (!isReady) {
                selector.chan.unshift(value);
            } else {
                selector.chan.put(value);
            }
        }
    });
    await Promise.race(promises);
    isReady = true;
    return selectors[index].fn(resValue);
}
export default makechan;
