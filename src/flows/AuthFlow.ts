import { Page } from "@playwright/test";
import { AuthPage } from "../pages/AuthPage";

export class AuthFlow {
    private readonly authPage: AuthPage;

    constructor(page: Page) {
        this.authPage = new AuthPage(page);
    }

    async login(username: string, password: string) {
        await this.authPage.open();
        await this.authPage.login(username, password);
    }
}
