import { test, expect } from "../fixtures/baseTest";
import { AuthFlow } from "../../src/flows/AuthFlow";
import { DashboardPage } from "../../src/pages/DashboardPage";

test("@smoke login to dashboard", async ({ page }) => {
    const authFlow = new AuthFlow(page);
    const dashboard = new DashboardPage(page);

    await authFlow.login("principal.engineer", "StrongPass!");
    await page.goto("/");
    await dashboard.isVisible();
    await expect(dashboard.dashboardRoot).toBeVisible();
})