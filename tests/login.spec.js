import { test, expect } from '@playwright/test';
import 'dotenv/config';
import { LoginPage } from '../pages/LoginPage.js';

const user = process.env.USER_STANDARD;
const userLocked = process.env.USER_LOCKED;
const password = process.env.USER_PASSWORD;

test(`Positive Case - Verify User be able to Login Successfully`, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('1. Login Successfully', async () => {
    await loginPage.navigate();
    await loginPage.login(user, password);
    await loginPage.assertLoginSuccess();
  });

  await test.step('2. Verify inventory page is displayed', async () => {
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });
});

test(`Negative Case - Verify User should not be able Login with Empty or Invalid User`, async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('1. Login with Empty Field', async () => {
    await loginPage.navigate();
    await loginPage.login('', '');
    await loginPage.assertErrorMessage('Epic sadface: Username is required');
  });

  await test.step('2. Login with Invalid User Credential', async () => {
    await loginPage.navigate();
    await loginPage.login('Test', password);
    await loginPage.assertErrorMessage(
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  await test.step('3. Login with Locked Out User', async () => {
    await loginPage.navigate();
    await loginPage.login(userLocked, password);
    await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });
});
