import Chan from "./Chan";
export function makechan<T>(name?: string) {
    return new Chan<T>(name);
}
export async function select(...chans: Array<Chan<any>>): Promise<any> {
    const promises = chans.map((chan) => chan.get());
    const value = await Promise.race(promises);
    promises.map((promise, i) => {
        if (promise.status === "resolved") {
            chans[i].unshift(promise.value);
        }
    });
    return value;
}
export default makechan;
