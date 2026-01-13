import { Page, Locator } from "@playwright/test";

export class ExperimentsPage {
    readonly page: Page;
    readonly variantA: Locator;
    readonly variantB: Locator;
    readonly flagOverride: Locator;
    readonly roleSelect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.variantA = page.getByTestId("variant-a");
        this.variantB = page.getByTestId("variant-b");
        this.flagOverride = page.getByTestId("flag-override");
        this.roleSelect = page.getByTestId("role-select");
    }

    async chooseVariantA() {
        await this.variantA.click();
    }

    async chooseVariantB() {
        await this.variantB.click();
    }

    async activeVariantText() {
        return this.page.getByText(/Active variant:/).textContent();
    }

    async applyFlagOverride() {
        await this.flagOverride.click();
    }

    async selectRole(role: string) {
        await this.roleSelect.selectOption(role);
    }

    async flagEnabledText() {
        return this.page.getByText(/Flag enabled:/).textContent();
    }
}
