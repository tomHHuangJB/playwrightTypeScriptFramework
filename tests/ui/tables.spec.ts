import { test, expect } from "../fixtures/baseTest";
import { TablesPage } from "../../src/pages/TablesPage";

test("table operations", async ({ page }) => {
    const tables = new TablesPage(page);

    await page.goto("/tables");
    await expect(tables.dataGrid).toBeVisible();

    await tables.selectRow(1);
    await tables.updateRowName(2, "Row 2 Updated");
    await tables.updateRowStatus(3, "Archived");

    await expect(page.getByTestId("row-name-2")).toHaveValue("Row 2 Updated");
    await expect(page.getByTestId("row-status-3")).toHaveValue("Archived");

    await tables.sortAscending();
    await tables.filterActiveRows();
    await tables.nextCursorPage();
    await tables.nextOffsetPage();
    await tables.exportCsv();
    await page.getByTestId("cursor-prev").click();
    await page.getByTestId("sort-desc").click();
    await page.getByTestId("bulk-archive").click();
    await page.getByTestId("col-resize").click();
    await page.getByTestId("col-reorder").click();
    await page.getByTestId("col-pin").click();
});
