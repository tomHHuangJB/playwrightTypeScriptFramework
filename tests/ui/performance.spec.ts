import { test, expect } from "../fixtures/baseTest";
import { PerformancePage } from "../../src/pages/PerformancePage";

test("performance signals", async ({ page }) => {
    const performance = new PerformancePage(page);

    await page.goto("/performance");

    // Rendering variability: large DOM can take time to fully mount.
    await expect.poll(() => performance.largeDomCount()).toBeGreaterThan(100);
    await performance.blockMain();

    await expect(performance.workerResult).toContainText("Result:");
    await expect(performance.cpuIndicator).toContainText("Simulated CPU");
    await expect(page.getByRole("img", { name: "lazy" }).first()).toBeVisible();
    await expect(page.getByText("Performance marks available in performance entries.")).toBeVisible();
});
