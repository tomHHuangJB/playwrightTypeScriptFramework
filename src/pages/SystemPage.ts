import { Page, Locator } from "@playwright/test";

export class SystemPage {
    readonly page: Page;
    readonly alertButton: Locator;
    readonly confirmButton: Locator;
    readonly promptButton: Locator;
    readonly windowOpen: Locator;
    readonly storageWrite: Locator;
    readonly storageEvent: Locator;
    readonly roleSelect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.alertButton = page.getByTestId("dialog-alert");
        this.confirmButton = page.getByTestId("dialog-confirm");
        this.promptButton = page.getByTestId("dialog-prompt");
        this.windowOpen = page.getByTestId("window-open");
        this.storageWrite = page.getByTestId("storage-write");
        this.storageEvent = page.getByTestId("storage-event");
        this.roleSelect = page.getByTestId("role-access-select");
    }

    async openAlert() {
        await this.alertButton.click();
    }

    async openConfirm() {
        await this.confirmButton.click();
    }

    async openPrompt() {
        await this.promptButton.click();
    }

    async openNewWindow() {
        await this.windowOpen.click();
    }

    async writeStorage() {
        await this.storageWrite.click();
    }

    async storageEventText() {
        return this.storageEvent.textContent();
    }

    async selectRole(role: string) {
        await this.roleSelect.selectOption(role);
    }
}
