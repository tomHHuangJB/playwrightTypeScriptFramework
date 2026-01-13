import { test, expect } from "../fixtures/baseTest";
import { ErrorsPage } from "../../src/pages/ErrorsPage";

test("error states and security labs", async ({ page }) => {
    const errors = new ErrorsPage(page);

    await page.goto("/errors");

    await errors.triggerNetworkFail();
    await errors.triggerTimeouts();
    await expect(errors.partialGood).toBeVisible();
    await expect(errors.partialFail).toBeVisible();

    await errors.startLeak();
    await expect.poll(async () => (await page.getByText(/Leak size:/).textContent()) ?? "").not.toContain("Leak size: 0");

    await errors.runSecurityLabs();
    await expect(errors.auditLog).toContainText("Audit log");
});
