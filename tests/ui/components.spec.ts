import { test, expect } from "../fixtures/baseTest";
import { ComponentsPage } from "../../src/pages/ComponentsPage";

test("components coverage", async ({ page }) => {
    const components = new ComponentsPage(page);

    await page.goto("/components");
    await expect(components.virtualList).toBeVisible();

    // Async UI update: poll for list growth after clicking "Load more".
    const before = await components.infiniteItemsCount();
    await components.loadMoreItems();
    await expect.poll(() => components.infiniteItemsCount()).toBeGreaterThan(before);

    await expect(components.svgChart).toBeVisible();
    await expect(components.canvas).toBeVisible();
    await components.svgChart.locator("rect").nth(1).click();
    await expect(page.getByText(/Selected bar:/)).toContainText("B");

    page.once("dialog", async (dialog) => {
        await dialog.accept();
    });
    await components.openContextMenu();

    await components.triggerToast();
    // Animation timing: toast appears briefly; poll to avoid missing the window.
    await expect.poll(() => components.hasToasts()).toBeTruthy();

    await page.getByText("Hover tooltip").hover();
    await expect(page.getByText("Delayed tooltip content")).toBeVisible();
});
