import { Page, Locator } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly dashboardRoot: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dashboardRoot = page.getByTestId("session-state");
    }

    async isVisible() {
        await this.dashboardRoot.waitFor({ state: "visible"});
    }
}
