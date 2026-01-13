import { Page, Locator } from "@playwright/test";

export class ErrorsPage {
    readonly page: Page;
    readonly networkFail: Locator;
    readonly timeout1s: Locator;
    readonly timeout5s: Locator;
    readonly timeout30s: Locator;
    readonly partialGood: Locator;
    readonly partialFail: Locator;
    readonly leakStart: Locator;
    readonly auditLog: Locator;
    readonly securityInjection: Locator;
    readonly securityAccess: Locator;
    readonly securityXss: Locator;
    readonly securityVuln: Locator;
    readonly securitySsrf: Locator;
    readonly securityCrypto: Locator;
    readonly securityLogging: Locator;

    constructor(page: Page) {
        this.page = page;
        this.networkFail = page.getByTestId("network-fail");
        this.timeout1s = page.getByTestId("timeout-1s");
        this.timeout5s = page.getByTestId("timeout-5s");
        this.timeout30s = page.getByTestId("timeout-30s");
        this.partialGood = page.getByTestId("partial-good");
        this.partialFail = page.getByTestId("partial-fail");
        this.leakStart = page.getByTestId("leak-start");
        this.auditLog = page.getByTestId("audit-log");
        this.securityInjection = page.getByTestId("security-injection");
        this.securityAccess = page.getByTestId("security-access");
        this.securityXss = page.getByTestId("security-xss");
        this.securityVuln = page.getByTestId("security-vuln");
        this.securitySsrf = page.getByTestId("security-ssrf");
        this.securityCrypto = page.getByTestId("security-crypto");
        this.securityLogging = page.getByTestId("security-logging");
    }

    async triggerNetworkFail() {
        await this.networkFail.click();
    }

    async triggerTimeouts() {
        await this.timeout1s.click();
        await this.timeout5s.click();
        await this.timeout30s.click();
    }

    async partialGoodVisible() {
        return this.partialGood.isVisible();
    }

    async partialFailVisible() {
        return this.partialFail.isVisible();
    }

    async startLeak() {
        await this.leakStart.click();
    }

    async auditLogText() {
        return this.auditLog.textContent();
    }

    async runSecurityLabs() {
        await this.securityInjection.click();
        await this.securityAccess.click();
        await this.securityXss.click();
        await this.securityVuln.click();
        await this.securitySsrf.click();
        await this.securityCrypto.click();
        await this.securityLogging.click();
    }
}
