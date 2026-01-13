import { Page, Locator } from "@playwright/test";

export class IntegrationsPage {
    readonly page: Page;
    readonly paymentIframe: Locator;
    readonly iframeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paymentIframe = page.getByTestId("payment-iframe");
        this.iframeMessage = page.getByTestId("iframe-message");
    }

    async approvePayment() {
        const frame = this.page.frameLocator("[data-testid='payment-iframe']");
        await frame.getByRole("button", { name: "Approve Payment" }).click();
    }

    async messageText() {
        return this.iframeMessage.textContent();
    }
}
