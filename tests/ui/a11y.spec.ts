import { test, expect } from "../fixtures/baseTest";
import { A11yPage } from "../../src/pages/A11yPage";

test("a11y features", async ({ page }) => {
    const a11y = new A11yPage(page);

    await page.goto("/a11y");

    await a11y.announceUpdate();
    await expect(a11y.ariaLive).not.toHaveText("Ready");

    await page.getByRole("button", { name: "Open modal" }).click();
    await expect(a11y.focusModal).toBeVisible();

    await a11y.toggleHighContrast();
    await a11y.toggleReducedMotion();
});
