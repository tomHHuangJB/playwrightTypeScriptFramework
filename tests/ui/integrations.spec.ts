import { test, expect } from "../fixtures/baseTest";
import { IntegrationsPage } from "../../src/pages/IntegrationsPage";

test("iframe postMessage integration", async ({ page }) => {
    const integrations = new IntegrationsPage(page);

    await page.goto("/integrations");
    await integrations.approvePayment();

    await expect(integrations.iframeMessage).toContainText("payment-approved");
});
