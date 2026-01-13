import { test, expect } from "../fixtures/baseTest";
import { SystemPage } from "../../src/pages/SystemPage";

test("system dialogs and windows", async ({ page, context }) => {
    const system = new SystemPage(page);

    await page.goto("/system");

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

    const [popup] = await Promise.all([
        context.waitForEvent("page"),
        system.openNewWindow()
    ]);
    await popup.close();

    await system.selectRole("admin");
    await system.writeStorage();

    const storageText = await system.storageEventText();
    expect(storageText).toMatch(/Storage event|No events yet/);
});
