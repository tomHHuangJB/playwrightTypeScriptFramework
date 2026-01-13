import { Page, Locator } from "@playwright/test";

export class FilesPage {
    readonly page: Page;
    readonly fileInput: Locator;
    readonly uploadAdvance: Locator;
    readonly downloadCsv: Locator;
    readonly downloadPdf: Locator;
    readonly downloadRetry: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = page.getByTestId("file-input");
        this.uploadAdvance = page.getByTestId("upload-advance");
        this.downloadCsv = page.getByTestId("download-csv");
        this.downloadPdf = page.getByTestId("download-pdf");
        this.downloadRetry = page.getByTestId("download-retry");
    }

    async uploadFile(filePath: string) {
        await this.fileInput.setInputFiles(filePath);
    }

    async advanceUpload() {
        await this.uploadAdvance.click();
    }

    async downloadCsvFile() {
        await this.downloadCsv.click();
    }

    async downloadPdfFile() {
        await this.downloadPdf.click();
    }

    async retryDownload() {
        await this.downloadRetry.click();
    }
}
