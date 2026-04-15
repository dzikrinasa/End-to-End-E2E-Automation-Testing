import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.pageTitle = page.locator('[data-test="title"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await expect(this.page.getByText('Swag Labs')).toBeVisible();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory\.html$/);
    await expect(this.pageTitle).toHaveText('Products');
  }

  async assertErrorMessage(expectedMessage) {
    await expect(this.page).not.toHaveURL(/inventory\.html$/);
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}
