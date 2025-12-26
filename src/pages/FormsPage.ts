import { Page, Locator } from "@playwright/test";

export class FormsPage {
    readonly page: Page;
    readonly toggleExtra: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toggleExtra = page.getByTestId("toggle-extra");
    }

    async isLoaded() {
        await this.toggleExtra.waitFor({ state: "visible" });
    }
}
