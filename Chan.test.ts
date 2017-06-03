import Chan from "./Chan";
it("when waiters added in queue should resolved as queues", async () => {
    const chan = new Chan();
    const getPromise = chan.get();
    const getPromise2 = chan.get();
    chan.put("test");
    chan.put("test2");
    expect(await getPromise).toBe("test");
    expect(await getPromise2).toBe("test2");
});
it("when 2 values in queue should return as queue", async () => {
    const chan = new Chan();
    chan.put("value1");
    chan.put("value2");
    expect(await chan.get()).toBe("value1");
    expect(await chan.get()).toBe("value2");
});
