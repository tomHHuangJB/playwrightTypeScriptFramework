import path from "path";
import { test } from "../fixtures/baseTest";
import { FilesPage } from "../../src/pages/FilesPage";

test("files upload and download actions", async ({ page }) => {
    const files = new FilesPage(page);

    await page.goto("/files");

    const samplePath = path.resolve(__dirname, "..", "fixtures", "sample.txt");
    await files.uploadFile(samplePath);
    await files.advanceUpload();
    await files.downloadCsvFile();
    await files.downloadPdfFile();
    await files.retryDownload();
    await page.getByTestId("download-resume").click();
});
