import { test, expect } from "../fixtures/baseTest";
import { ComponentsPage } from "../../src/pages/ComponentsPage";

test("components coverage", async ({ page }) => {
    const components = new ComponentsPage(page);

    await page.goto("/components");
    await expect(components.virtualList).toBeVisible();

    const before = await components.infiniteItemsCount();
    await components.loadMoreItems();
    await expect.poll(() => components.infiniteItemsCount()).toBeGreaterThan(before);

    await expect(components.svgChart).toBeVisible();
    await expect(components.canvas).toBeVisible();

    page.once("dialog", async (dialog) => {
        await dialog.accept();
    });
    await components.openContextMenu();

    await components.triggerToast();
    await expect.poll(() => components.hasToasts()).toBeTruthy();
});
