import { test, expect } from "../fixtures/baseTest";
import { AuthPage } from "../../src/pages/AuthPage";
import { DashboardPage } from "../../src/pages/DashboardPage";

test("@smoke login to dashboard", async ({ page }) => {
    const auth = new AuthPage(page);
    const dashboard = new DashboardPage(page);

    await auth.open();
    await auth.login("principal.engineer", "StrongPass!");
    await page.goto("/");
    await dashboard.isVisible();
    await expect(dashboard.dashboardRoot).toBeVisible();
})