import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly sessionState: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sessionState = page.getByTestId('session-state');
    }

    async open() {
        await this.page.goto('/');
    }

    async isLoaded() {
        await this.sessionState.waitFor({ state: 'visible' });
    }
}
