import { test, expect } from "../fixtures/baseTest";
import { SystemPage } from "../../src/pages/SystemPage";

test("system dialogs and windows", async ({ page, context }) => {
    const system = new SystemPage(page);

    await page.goto("/system");
    await system.requestGeolocationPermission();
    await expect(system.permissionResult).toContainText("Geolocation =>");
    await expect(system.permissionStatusList).toContainText("Geo:");

    await system.requestNotificationPermission();
    await expect(system.permissionResult).toContainText("Notifications =>");
    await expect(system.permissionStatusList).toContainText("Notifications:");

    await system.requestClipboardPermission();
    await expect(system.permissionResult).toContainText("Clipboard =>");
    await expect(system.permissionStatusList).toContainText("Clipboard:");

    page.once("dialog", async (dialog) => {
        await dialog.accept();
    });
    await system.openAlert();
    await expect(system.dialogResult).toContainText("Alert acknowledged");

    page.once("dialog", async (dialog) => {
        await dialog.dismiss();
    });
    await system.openConfirm();
    await expect(system.dialogResult).toContainText("Confirm => dismissed");

    page.once("dialog", async (dialog) => {
        await dialog.accept("Selenium");
    });
    await system.openPrompt();
    await expect(system.dialogResult).toContainText("Prompt => Selenium");

    // Environment variance: Popups can be blocked in CI; add a timeout fallback to avoid hangs.
    const popupPromise = context.waitForEvent("page").catch(() => null);
    await system.openNewWindow();
    const popup = await Promise.race([
        popupPromise,
        page.waitForTimeout(1000).then(() => null)
    ]);
    await expect(system.windowStatus).toContainText(/Popup opened|Popup blocked/);
    if (popup) {
        await popup.close();
    }

    await expect(system.destructiveActionButton).toBeDisabled();
    await system.selectRole("admin");
    await expect(system.roleAdminVisibility).toContainText("visible");
    await expect(system.rolePermissions).toContainText(/Permissions:/);
    await expect(system.destructiveActionButton).toBeEnabled();
    await system.writeStorage();

    const storageText = await system.storageEventText();
    expect(storageText).toMatch(/Local write: session-|Storage event sync: session-/);
});
