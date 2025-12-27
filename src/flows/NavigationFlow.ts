import { Page } from "@playwright/test";
import { Header } from "../components/Header";

export class NavigationFlow {

    private readonly header: Header;
    constructor(page: Page) {
        this.header = new Header(page);
    }

    async goToForms() {
        await this.header.navigateToForms();
    }
}