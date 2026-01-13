import { test, expect } from "../fixtures/baseTest";
import { I18nPage } from "../../src/pages/I18nPage";

test("locale and timezone widgets", async ({ page }) => {
    const i18n = new I18nPage(page);

    await page.goto("/i18n");

    await i18n.selectLocale("ar");
    await expect.poll(() => i18n.pageDirAttribute()).toBe("rtl");

    await i18n.selectTimezone("Asia/Tokyo");
    await expect(page.getByText(/Selected TZ:/)).toContainText("Asia/Tokyo");
});
