import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly sessionState: Locator;
    readonly notificationLog: Locator;
    readonly wsStatus: Locator;
    readonly primaryNav: Locator;
    readonly complementaryPanel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sessionState = page.getByTestId('session-state');
        this.notificationLog = page.getByTestId("notification-log");
        this.wsStatus = page.getByTestId("ws-status");
        this.primaryNav = page.getByRole("navigation", { name: "Primary" });
        this.complementaryPanel = page.getByRole("complementary", { name: "Dashboard info" });
    }

    async open() {
        await this.page.goto('/');
    }

    async isLoaded() {
        await this.sessionState.waitFor({ state: 'visible' });
    }
}
