import { test as base } from '@playwright/test';

export const test = base.extend({});
export { expect } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  if (process.env.CI && process.env.SKIP_UI === 'true') {
    testInfo.skip('UI tests skipped in CI by SKIP_UI.');
  }
});
