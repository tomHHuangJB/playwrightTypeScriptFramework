import { Page, Locator } from "@playwright/test";

export class SystemPage {
    readonly page: Page;
    readonly geoPermissionButton: Locator;
    readonly notificationPermissionButton: Locator;
    readonly clipboardPermissionButton: Locator;
    readonly permissionResult: Locator;
    readonly permissionStatusList: Locator;
    readonly alertButton: Locator;
    readonly confirmButton: Locator;
    readonly promptButton: Locator;
    readonly dialogResult: Locator;
    readonly windowOpen: Locator;
    readonly windowStatus: Locator;
    readonly storageWrite: Locator;
    readonly storageEvent: Locator;
    readonly roleSelect: Locator;
    readonly rolePermissions: Locator;
    readonly roleAdminVisibility: Locator;
    readonly destructiveActionButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.geoPermissionButton = page.getByTestId("perm-geo");
        this.notificationPermissionButton = page.getByTestId("perm-notif");
        this.clipboardPermissionButton = page.getByTestId("perm-clipboard");
        this.permissionResult = page.getByTestId("perm-result");
        this.permissionStatusList = page.getByTestId("perm-status-list");
        this.alertButton = page.getByTestId("dialog-alert");
        this.confirmButton = page.getByTestId("dialog-confirm");
        this.promptButton = page.getByTestId("dialog-prompt");
        this.dialogResult = page.getByTestId("dialog-result");
        this.windowOpen = page.getByTestId("window-open");
        this.windowStatus = page.getByTestId("window-status");
        this.storageWrite = page.getByTestId("storage-write");
        this.storageEvent = page.getByTestId("storage-event");
        this.roleSelect = page.getByTestId("role-access-select");
        this.rolePermissions = page.getByTestId("role-permissions");
        this.roleAdminVisibility = page.getByTestId("role-admin-visibility");
        this.destructiveActionButton = page.getByTestId("role-destructive-action");
    }

    async requestGeolocationPermission() {
        await this.geoPermissionButton.click();
    }

    async requestNotificationPermission() {
        await this.notificationPermissionButton.click();
    }

    async requestClipboardPermission() {
        await this.clipboardPermissionButton.click();
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
