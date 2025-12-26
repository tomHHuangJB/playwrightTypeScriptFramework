import { Page, Locator } from "@playwright/test";

export class Header {
    readonly page: Page;
    readonly formsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formsLink = page.getByRole("link", { name: "Forms" });
    }

    async navigateToForms() {
        await this.formsLink.click();
    }
}
