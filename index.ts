import Chan from "./Chan";
export function makechan(name?: string) {
    return new Chan(name);
}
export default makechan;
