import { Page, Locator } from "@playwright/test";

export class ComponentsPage {
    readonly page: Page;
    readonly virtualList: Locator;
    readonly infiniteScroll: Locator;
    readonly loadMore: Locator;
    readonly svgChart: Locator;
    readonly canvas: Locator;
    readonly contextZone: Locator;
    readonly toastButton: Locator;
    readonly toastItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.virtualList = page.getByTestId("virtual-list");
        this.infiniteScroll = page.getByTestId("infinite-scroll");
        this.loadMore = page.getByTestId("load-more");
        this.svgChart = page.getByTestId("svg-chart");
        this.canvas = page.getByTestId("canvas");
        this.contextZone = page.getByTestId("context-zone");
        this.toastButton = page.getByTestId("toast-btn");
        this.toastItem = page.getByTestId("toast-item");
    }

    async virtualListVisible() {
        return this.virtualList.isVisible();
    }

    async infiniteItemsCount() {
        return this.infiniteScroll.locator("div.rounded").count();
    }

    async loadMoreItems() {
        await this.loadMore.click();
    }

    async svgVisible() {
        return this.svgChart.isVisible();
    }

    async canvasVisible() {
        return this.canvas.isVisible();
    }

    async openContextMenu() {
        await this.contextZone.click({ button: "right" });
    }

    async triggerToast() {
        await this.toastButton.click();
    }

    async hasToasts() {
        return (await this.toastItem.count()) > 0;
    }
}
