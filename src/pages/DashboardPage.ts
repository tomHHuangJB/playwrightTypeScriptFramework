import { Page, Locator } from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly dashboardRoot: Locator;

    constructor(page: Page) {
        this.page = page;
        // Accessibility tree latency: stable test id avoids WebKit ARIA delays.
        this.dashboardRoot = page.getByTestId("session-state");
    }

    async isVisible() {
        await this.dashboardRoot.waitFor({ state: "visible"});
    }
}
