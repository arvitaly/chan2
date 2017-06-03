import { makechan, select } from ".";
it("race should resolve first channel and remove other waiters", async () => {
    const chan1 = makechan();
    const chan2 = makechan();
    const selectPromise = select(
        chan1, chan2,
    );
    chan1.put("chan1Value");
    chan2.put("chan2Value");
    expect(await selectPromise).toBe("chan1Value");
    expect(await chan2.get()).toBe("chan2Value");
});
