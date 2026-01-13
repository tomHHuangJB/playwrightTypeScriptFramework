import { test, expect } from "../fixtures/baseTest";
import { PerformancePage } from "../../src/pages/PerformancePage";

test("performance signals", async ({ page }) => {
    const performance = new PerformancePage(page);

    await page.goto("/performance");

    await expect.poll(() => performance.largeDomCount()).toBeGreaterThan(100);
    await performance.blockMain();

    await expect(performance.workerResult).toContainText("Result:");
    await expect(performance.cpuIndicator).toContainText("Simulated CPU");
});
