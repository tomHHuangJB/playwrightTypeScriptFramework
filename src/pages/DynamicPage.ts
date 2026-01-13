import { Page, Locator } from "@playwright/test";

export class DynamicPage {
    readonly page: Page;
    readonly optimisticCount: Locator;
    readonly optimisticButton: Locator;
    readonly optimisticStatus: Locator;
    readonly raceTrigger: Locator;
    readonly dedupTrigger: Locator;
    readonly partialTrigger: Locator;
    readonly cacheToggle: Locator;
    readonly wsDisconnect: Locator;
    readonly swRegister: Locator;
    readonly swUnregister: Locator;
    readonly skeletonCard: Locator;
    readonly partialFailure: Locator;
    readonly dynamicLog: Locator;

    constructor(page: Page) {
        this.page = page;
        this.optimisticCount = page.getByTestId("optimistic-count");
        this.optimisticButton = page.getByTestId("optimistic-btn");
        this.optimisticStatus = page.getByTestId("optimistic-status");
        this.raceTrigger = page.getByTestId("race-trigger");
        this.dedupTrigger = page.getByTestId("dedup-trigger");
        this.partialTrigger = page.getByTestId("partial-trigger");
        this.cacheToggle = page.getByTestId("cache-toggle");
        this.wsDisconnect = page.getByTestId("ws-disconnect");
        this.swRegister = page.getByTestId("sw-register");
        this.swUnregister = page.getByTestId("sw-unregister");
        this.skeletonCard = page.getByTestId("skeleton-card");
        this.partialFailure = page.getByTestId("partial-failure");
        this.dynamicLog = page.getByTestId("dynamic-log");
    }

    async count() {
        return Number(await this.optimisticCount.textContent());
    }

    async clickOptimistic() {
        await this.optimisticButton.click();
    }

    async statusText() {
        return this.optimisticStatus.textContent();
    }

    async triggerRace() {
        await this.raceTrigger.click();
    }

    async triggerDedup() {
        await this.dedupTrigger.click();
    }

    async triggerPartial() {
        await this.partialTrigger.click();
    }

    async toggleCache() {
        await this.cacheToggle.click();
    }

    async simulateDisconnect() {
        await this.wsDisconnect.click();
    }

    async registerServiceWorker() {
        await this.swRegister.click();
    }

    async unregisterServiceWorker() {
        await this.swUnregister.click();
    }

    async skeletonVisible() {
        return this.skeletonCard.isVisible();
    }

    async partialFailureVisible() {
        return this.partialFailure.isVisible();
    }

    async logItemsCount() {
        return this.dynamicLog.locator("li").count();
    }
}
