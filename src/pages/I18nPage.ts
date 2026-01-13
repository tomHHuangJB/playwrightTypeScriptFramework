import { Page, Locator } from "@playwright/test";

export class I18nPage {
    readonly page: Page;
    readonly localeSelect: Locator;
    readonly timezoneSelect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.localeSelect = page.getByTestId("locale-select");
        this.timezoneSelect = page.getByTestId("timezone-select");
    }

    async selectLocale(locale: string) {
        await this.localeSelect.selectOption(locale);
    }

    async selectTimezone(timezone: string) {
        await this.timezoneSelect.selectOption(timezone);
    }

    async pageDirAttribute() {
        return this.localeSelect.evaluate((el) => el.closest("div[dir]")?.getAttribute("dir") ?? "");
    }

    async timezoneText() {
        return this.page.getByText(/Selected TZ:/).textContent();
    }
}
