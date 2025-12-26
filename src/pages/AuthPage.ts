import { Page, Locator } from "@playwright/test";

export class AuthPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId("login-username");
        this.passwordInput = page.getByTestId("login-password");
        this.submitButton = page.getByTestId("login-submit");
    }

    async open() {
        await this.page.goto("/auth");
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }
}