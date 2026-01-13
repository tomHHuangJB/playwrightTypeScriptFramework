import { test, expect } from "../fixtures/baseTest";
import { AuthPage } from "../../src/pages/AuthPage";

test("auth login and mfa", async ({ page }) => {
    const auth = new AuthPage(page);

    await page.goto("/auth");
    await auth.login("principal.engineer", "demo", true);
    await auth.submitMfa("123456");

    await expect(auth.mfaInput).toHaveValue("123456");
});
