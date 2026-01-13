import { test, expect } from "../fixtures/baseTest";
import { ExperimentsPage } from "../../src/pages/ExperimentsPage";

test("experiments flags", async ({ page }) => {
    const experiments = new ExperimentsPage(page);

    await page.goto("/experiments");
    await experiments.chooseVariantB();
    await expect(page.getByText(/Active variant:/)).toContainText("B");

    await experiments.applyFlagOverride();
    await experiments.selectRole("admin");
    await expect(page.getByText(/Flag enabled:/)).toContainText("true");
});
