import { test, expect } from "../fixtures/baseTest";
import { HomePage } from "../../src/pages/HomePage";

test('@smoke home page loads', async ({ page }) => {
    const home = new HomePage(page);
    await home.open();
    await home.isLoaded();
    await expect(home.sessionState).toBeVisible();
    await expect(home.notificationLog).toBeVisible();
    await expect(home.wsStatus).not.toHaveText("");
    await expect(home.primaryNav).toBeVisible();
    await expect(home.complementaryPanel).toBeVisible();
});
