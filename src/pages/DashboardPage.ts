import { Page, Locator } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly dashboardRoot: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardRoot = page.getByRole("main", { name: "Dashboard"});
    }

    async isVisible() {
        await this.dashboardRoot.waitFor({ state: "visible"});
    }
}