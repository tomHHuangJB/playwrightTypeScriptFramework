import { Page, Locator } from "@playwright/test";

export class AuthPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly rememberCheckbox: Locator;
    readonly submitButton: Locator;
    readonly mfaInput: Locator;
    readonly mfaVerifyButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId("login-username");
        this.passwordInput = page.getByTestId("login-password");
        this.rememberCheckbox = page.getByTestId("login-remember");
        this.submitButton = page.getByTestId("login-submit");
        this.mfaInput = page.getByTestId("mfa-code");
        this.mfaVerifyButton = page.getByTestId("mfa-verify");
    }

    async open() {
        await this.page.goto("/auth");
        // Render timing: wait for inputs before interacting to avoid race conditions.
        await this.usernameInput.waitFor({ state: "visible" });
    }

    async login(username: string, password: string, remember = false) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        if (remember) {
            await this.rememberCheckbox.check();
        }
        await this.submitButton.click();
    }

    async submitMfa(code: string) {
        await this.mfaInput.fill(code);
        await this.mfaVerifyButton.click();
    }
}
