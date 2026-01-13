import { test, expect } from "../fixtures/baseTest";
import { ComponentsPage } from "../../src/pages/ComponentsPage";
import { AuthPage } from "../../src/pages/AuthPage";

test("advanced locator patterns", async ({ page }) => {
    const components = new ComponentsPage(page);
    const auth = new AuthPage(page);

    await page.goto("/components");
    page.once("dialog", async (dialog) => {
        await dialog.accept();
    });
    await components.openContextMenu();

    await components.toastButton.scrollIntoViewIfNeeded();
    await components.triggerToast();
    await expect(components.toastItem).toBeVisible();

    await page.goto("/auth");
    await auth.usernameInput.fill("relative-locator");
    await expect(auth.usernameInput).toHaveValue("relative-locator");
});
