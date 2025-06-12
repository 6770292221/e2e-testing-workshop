import { Page, expect } from "@playwright/test";
import { HomePageLocator } from "../fixtures/locators/home.page";

export class HomePage {
  constructor(private page: Page) {}

  async navigateToHome() {
    await this.page.goto(`${process.env.BASE_URL}`);
    await this.page.waitForLoadState("domcontentloaded");
  }

  async verifyHomePageVisible() {
    const homeNavLink = this.page.locator(HomePageLocator.homeNavLink);
    await expect(homeNavLink).toBeVisible();
  }

  async clickSignupLogin() {
    await this.page.click(HomePageLocator.signupLoginButton);
  }

  async deleteAccount() {
    await this.page.click(HomePageLocator.deleteAccountButton);
  }

  async verifyLoggedInAs(username: string) {
    const locator = this.page.locator(HomePageLocator.loggedInText);
    await expect(locator).toContainText(`Logged in as ${username}`);
  }
}
