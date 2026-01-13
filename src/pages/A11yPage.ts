import { Page, Locator } from "@playwright/test";

export class A11yPage {
    readonly page: Page;
    readonly announceButton: Locator;
    readonly ariaLive: Locator;
    readonly focusModal: Locator;
    readonly highContrast: Locator;
    readonly reducedMotion: Locator;

    constructor(page: Page) {
        this.page = page;
        this.announceButton = page.getByTestId("announce-btn");
        this.ariaLive = page.getByTestId("aria-live");
        this.focusModal = page.getByTestId("focus-modal");
        this.highContrast = page.getByTestId("high-contrast");
        this.reducedMotion = page.getByTestId("reduced-motion");
    }

    async announceUpdate() {
        await this.announceButton.click();
    }

    async ariaLiveText() {
        return this.ariaLive.textContent();
    }

    async modalVisible() {
        return this.focusModal.isVisible();
    }

    async toggleHighContrast() {
        await this.highContrast.click();
    }

    async toggleReducedMotion() {
        await this.reducedMotion.click();
    }
}
