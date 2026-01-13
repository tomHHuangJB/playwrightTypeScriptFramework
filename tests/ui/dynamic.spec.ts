import { test, expect } from "../fixtures/baseTest";
import { DynamicPage } from "../../src/pages/DynamicPage";

test("dynamic state behaviors", async ({ page }) => {
    const dynamic = new DynamicPage(page);

    await page.goto("/dynamic");

    const before = await dynamic.count();
    await dynamic.clickOptimistic();
    await expect(dynamic.optimisticStatus).not.toHaveText("saving");
    await expect.poll(() => dynamic.count()).toBeGreaterThanOrEqual(before);

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
