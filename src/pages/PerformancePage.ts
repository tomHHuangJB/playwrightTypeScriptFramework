import { Page, Locator } from "@playwright/test";

export class PerformancePage {
    readonly page: Page;
    readonly largeDom: Locator;
    readonly blockMainThread: Locator;
    readonly workerResult: Locator;
    readonly cpuIndicator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.largeDom = page.getByTestId("large-dom");
        this.blockMainThread = page.getByTestId("block-main-thread");
        this.workerResult = page.getByTestId("worker-result");
        this.cpuIndicator = page.getByTestId("cpu-indicator");
    }

    async largeDomCount() {
        return this.largeDom.locator("span").count();
    }

    async blockMain() {
        await this.blockMainThread.click();
    }

    async workerResultText() {
        return this.workerResult.textContent();
    }

    async cpuIndicatorText() {
        return this.cpuIndicator.textContent();
    }
}
