import { Page, Locator } from "@playwright/test";

export class DebugPanelPage {
    readonly page: Page;
    readonly closeButton: Locator;
    readonly showTestIds: Locator;
    readonly simulateOffline: Locator;
    readonly networkProfile: Locator;
    readonly permissionOverride: Locator;
    readonly timeSkew: Locator;
    readonly stateViewer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.closeButton = page.getByTestId("debug-close");
        this.showTestIds = page.getByTestId("debug-testids");
        this.simulateOffline = page.getByTestId("debug-offline");
        this.networkProfile = page.getByTestId("debug-network");
        this.permissionOverride = page.getByTestId("debug-permission");
        this.timeSkew = page.getByTestId("debug-time-skew");
        this.stateViewer = page.getByTestId("state-viewer");
    }

    async openPanel() {
        await this.page.evaluate(() => window.focus());
        await this.page.click("body");
        await this.page.keyboard.press("Alt+Shift+D");
        if (!(await this.isOpen())) {
            await this.page.evaluate(() => {
                const evt = (type: string) =>
                    new KeyboardEvent(type, { key: "d", code: "KeyD", altKey: true, shiftKey: true, bubbles: true });
                window.dispatchEvent(evt("keydown"));
                window.dispatchEvent(evt("keyup"));
                document.dispatchEvent(evt("keydown"));
                document.dispatchEvent(evt("keyup"));
            });
        }
        await this.closeButton.waitFor({ state: "visible" });
    }

    async isOpen() {
        return this.closeButton.isVisible();
    }

    async toggleShowTestIds() {
        await this.showTestIds.click({ force: true });
    }

    async toggleOffline() {
        await this.simulateOffline.click({ force: true });
    }

    async selectNetworkProfile(value: string) {
        await this.networkProfile.selectOption(value);
    }

    async selectPermissionOverride(value: string) {
        await this.permissionOverride.selectOption(value);
    }

    async setTimeSkew(value: string) {
        await this.timeSkew.fill(value);
    }

    async stateViewerText() {
        return this.stateViewer.textContent();
    }

    async testIdVisibilityAttr() {
        return this.page.evaluate(() => document.documentElement.getAttribute("data-testid-visible"));
    }
}
