import { test, expect } from '../fixtures/baseTest';
import { HomePage } from '../../src/pages/HomePage';
import { Header } from '../../src/components/Header';
import { FormsPage } from '../../src/pages/FormsPage';

test('@smoke navigate to forms', async ({ page}) => {
    const home = new HomePage(page);
    const header = new Header(page);
    const forms = new FormsPage(page);

    await home.open();
    await header.navigateToForms();
    await forms.isLoaded();
    await expect(forms.toggleExtra).toBeVisible();
});