import { test, expect } from "../fixtures/baseTest";
import { FormsPage } from "../../src/pages/FormsPage";

test("forms complex interactions", async ({ page }) => {
    const forms = new FormsPage(page);

    await page.goto("/forms");
    await forms.isLoaded();

    await forms.toggleExtraField();
    await expect(forms.conditionalInput).toBeVisible();

    await forms.wizardNextStep();
    await expect(forms.wizardStep).toContainText("Step 2");

    await forms.addArrayItem();
    await forms.removeArrayItem(0);

    await forms.enterRichText("Senior automation input");
    await forms.fillShadowInput("Shadow DOM value");
    await forms.pickColor("#ff0000");
    await forms.setRange(20, 80);
    await forms.setDatetime("2024-01-10T10:30");

    await expect(forms.dragDropZone).toBeVisible();
});
