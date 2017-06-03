import Chan from "./Chan";
export function makechan<T>(name?: string) {
    return new Chan<T>(name);
}
export default makechan;
