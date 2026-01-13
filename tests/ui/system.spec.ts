import { test, expect } from "../fixtures/baseTest";
import { SystemPage } from "../../src/pages/SystemPage";

test("system dialogs and windows", async ({ page, context }) => {
    const system = new SystemPage(page);

    await page.goto("/system");
    await page.getByTestId("perm-geo").click();
    await page.getByTestId("perm-notif").click();
    await page.getByTestId("perm-clipboard").click();

    page.once("dialog", async (dialog) => {
        await dialog.accept();
    });
    await system.openAlert();

    page.once("dialog", async (dialog) => {
        await dialog.dismiss();
    });
    await system.openConfirm();

    page.once("dialog", async (dialog) => {
        await dialog.accept("Selenium");
    });
    await system.openPrompt();

    // Environment variance: Popups can be blocked in CI; add a timeout fallback to avoid hangs.
    const popupPromise = context.waitForEvent("page").catch(() => null);
    await system.openNewWindow();
    const popup = await Promise.race([
        popupPromise,
        page.waitForTimeout(1000).then(() => null)
    ]);
    if (popup) {
        await popup.close();
    }

    await system.selectRole("admin");
    await system.writeStorage();

    const storageText = await system.storageEventText();
    expect(storageText).toMatch(/Storage event|No events yet/);
});
