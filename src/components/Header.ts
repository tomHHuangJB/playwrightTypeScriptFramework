import { Page, Locator } from '@playwright/test';

export class Header {
    readonly page: Page;
    readonly formsLink: Locator;
    readonly mobileMenuButton: Locator;
    readonly mobileFormsLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.formsLink = page.getByTestId('nav-forms');
        this.mobileMenuButton = page.getByTestId('mobile-menu-button');
        this.mobileFormsLink = page.getByTestId('mobile-nav-forms');
    }

    async navigateToForms() {
        if (await this.mobileMenuButton.isVisible()) {
            await this.mobileMenuButton.click();
            await this.mobileFormsLink.click();
            return;
        }
        await this.formsLink.click();
    }
}
