import { test, expect } from "../fixtures/baseTest";
import { DynamicPage } from "../../src/pages/DynamicPage";

test("dynamic state behaviors", async ({ page }) => {
    const dynamic = new DynamicPage(page);

    await page.goto("/dynamic");

    const before = await dynamic.count();
    await dynamic.clickOptimistic();
    // Async state race: Wait for a terminal state to avoid racing the optimistic update.
    await expect(dynamic.optimisticStatus).toHaveText(/saved|rollback/);
    const status = (await dynamic.optimisticStatus.textContent()) ?? "";
    const expected = status.includes("rollback") ? before : before + 1;
    await expect.poll(() => dynamic.count()).toBe(expected);

    await dynamic.triggerRace();
    await dynamic.triggerDedup();
    await dynamic.triggerPartial();
    await dynamic.toggleCache();
    await dynamic.simulateDisconnect();
    await dynamic.registerServiceWorker();
    await dynamic.unregisterServiceWorker();

    await expect(dynamic.skeletonCard).toBeVisible();
    await expect(dynamic.partialFailure).toBeVisible();
    await expect.poll(() => dynamic.logItemsCount()).toBeGreaterThan(0);
});
