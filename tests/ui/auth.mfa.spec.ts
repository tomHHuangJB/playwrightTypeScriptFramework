import { test, expect } from "../fixtures/baseTest";
import { AuthPage } from "../../src/pages/AuthPage";

test("auth login and mfa", async ({ page }) => {
    const auth = new AuthPage(page);

    await page.goto("/auth");
    await auth.login("principal.engineer", "demo", true);
    await auth.submitMfa("123456");

    await expect(auth.mfaInput).toHaveValue("123456");
    await expect(page.getByTestId("oauth-google")).toBeVisible();
    await expect(page.getByTestId("oauth-facebook")).toBeVisible();
    await expect(page.getByTestId("oauth-callback")).toBeVisible();

    await expect(page.getByTestId("session-refresh")).toBeVisible();
    await expect(page.getByTestId("session-concurrent")).toBeVisible();
    await expect(page.getByTestId("session-sso")).toBeVisible();

    await expect(page.getByTestId("auth-error-429")).toBeVisible();
    await expect(page.getByTestId("auth-error-expired")).toBeVisible();
    await expect(page.getByTestId("auth-error-invalid")).toBeVisible();
    await expect(page.getByTestId("auth-error-csrf")).toBeVisible();
    await expect(page.getByTestId("auth-error-lockout")).toBeVisible();
    await expect(page.getByTestId("auth-error-reset")).toBeVisible();
});
