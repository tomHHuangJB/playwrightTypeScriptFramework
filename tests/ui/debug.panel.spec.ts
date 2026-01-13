import { test, expect } from "../fixtures/baseTest";
import { DebugPanelPage } from "../../src/pages/DebugPanelPage";

test("debug panel controls", async ({ page }) => {
    const debug = new DebugPanelPage(page);

    await page.goto("/");
    await debug.openPanel();

    await debug.toggleShowTestIds();
    await expect.poll(() => debug.testIdVisibilityAttr()).toBe("true");

    await debug.toggleOffline();
    await debug.selectNetworkProfile("offline");
    await debug.selectPermissionOverride("granted");
    await debug.setTimeSkew("60000");

    await expect(debug.stateViewer).toContainText("offline");
    await expect(debug.stateViewer).toContainText("granted");
});
