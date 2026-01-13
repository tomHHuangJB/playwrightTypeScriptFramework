import { Page, Locator } from "@playwright/test";

export class TablesPage {
    readonly page: Page;
    readonly dataGrid: Locator;
    readonly cursorNext: Locator;
    readonly offsetNext: Locator;
    readonly bulkExport: Locator;
    readonly sortAsc: Locator;
    readonly filterActive: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dataGrid = page.getByTestId("data-grid");
        this.cursorNext = page.getByTestId("cursor-next");
        this.offsetNext = page.getByTestId("offset-next");
        this.bulkExport = page.getByTestId("bulk-export");
        this.sortAsc = page.getByTestId("sort-asc");
        this.filterActive = page.getByTestId("filter-active");
    }

    async gridVisible() {
        return this.dataGrid.isVisible();
    }

    async selectRow(rowId: number) {
        await this.page.getByTestId(`row-select-${rowId}`).check();
    }

    async updateRowName(rowId: number, name: string) {
        const input = this.page.getByTestId(`row-name-${rowId}`);
        await input.fill(name);
        await input.blur();
    }

    async updateRowStatus(rowId: number, status: string) {
        await this.page.getByTestId(`row-status-${rowId}`).selectOption(status);
    }

    async nextCursorPage() {
        await this.cursorNext.click();
    }

    async nextOffsetPage() {
        await this.offsetNext.click();
    }

    async exportCsv() {
        await this.bulkExport.click();
    }

    async sortAscending() {
        await this.sortAsc.click();
    }

    async filterActiveRows() {
        await this.filterActive.click();
    }
}
