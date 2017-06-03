import { makechan, select } from ".";
it("race should resolve first channel and remove other waiters", async () => {
    const chan1 = makechan();
    const chan2 = makechan();
    const chan3 = makechan();
    const selectPromise = select(
        chan1.wait((value: any) => value),
        chan2.wait((value: any) => value));
    chan1.put("chan1Value");
    chan2.put("chan2Value");
    expect(await selectPromise).toBe("chan1Value");
    expect(await chan2.get()).toBe("chan2Value");
    chan3.put("chan3Value");
    expect(await chan3.get()).toBe("chan3Value");
});
