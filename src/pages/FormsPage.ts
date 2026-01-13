import { Page, Locator } from "@playwright/test";

export class FormsPage {
    readonly page: Page;
    readonly toggleExtra: Locator;
    readonly conditionalInput: Locator;
    readonly wizardNext: Locator;
    readonly wizardStep: Locator;
    readonly arrayAdd: Locator;
    readonly richTextFrame: Locator;
    readonly dragDropZone: Locator;
    readonly colorPicker: Locator;
    readonly rangeMin: Locator;
    readonly rangeMax: Locator;
    readonly datetimePicker: Locator;
    readonly shadowHost: Locator;

    constructor(page: Page) {
        this.page = page;
        this.toggleExtra = page.getByTestId("toggle-extra");
        this.conditionalInput = page.getByTestId("conditional-input");
        this.wizardNext = page.getByTestId("wizard-next");
        this.wizardStep = page.getByTestId("wizard-step");
        this.arrayAdd = page.getByTestId("array-add");
        this.richTextFrame = page.getByTestId("rich-text-iframe");
        this.dragDropZone = page.getByTestId("drag-drop-zone");
        this.colorPicker = page.getByTestId("color-picker");
        this.rangeMin = page.getByTestId("range-min");
        this.rangeMax = page.getByTestId("range-max");
        this.datetimePicker = page.getByTestId("datetime-picker");
        this.shadowHost = page.getByTestId("shadow-host");
    }

    async isLoaded() {
        await this.toggleExtra.waitFor({ state: "visible" });
    }

    async toggleExtraField() {
        await this.toggleExtra.click();
    }

    async conditionalVisible() {
        return this.conditionalInput.isVisible();
    }

    async wizardNextStep() {
        await this.wizardNext.click();
    }

    async wizardStepText() {
        return this.wizardStep.textContent();
    }

    async addArrayItem() {
        await this.arrayAdd.click();
    }

    async removeArrayItem(index: number) {
        await this.page.getByTestId(`array-remove-${index}`).click();
    }

    async enterRichText(text: string) {
        const frame = this.page.frameLocator("[data-testid='rich-text-iframe']");
        const body = frame.locator("body");
        await body.click();
        await this.page.keyboard.press("Control+A");
        await this.page.keyboard.type(text);
    }

    async dragDropZoneVisible() {
        return this.dragDropZone.isVisible();
    }

    async pickColor(value: string) {
        await this.colorPicker.fill(value);
    }

    async setRange(min: number, max: number) {
        await this.rangeMin.fill(String(min));
        await this.rangeMax.fill(String(max));
    }

    async setDatetime(value: string) {
        await this.datetimePicker.fill(value);
    }

    async fillShadowInput(text: string) {
        const shadowInput = this.page.locator("[data-testid='shadow-host'] >> input[data-testid='shadow-input']");
        await shadowInput.fill(text);
    }
}
