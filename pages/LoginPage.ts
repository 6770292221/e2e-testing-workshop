import { Page, expect } from "@playwright/test";
import { LoginPageLocator } from "../fixtures/locators/login.page";
import { LoginPageExpected } from "../fixtures/expectedResult/login.expect";

export class LoginPage {
  constructor(private page: Page) {}

  async navigateToLogin() {
    await this.page.goto(`${process.env.BASE_URL}/login`);
  }

  async verifyNewUserSignupVisible() {
    const locator = this.page.locator(LoginPageLocator.newUserSignupText);
    const expectedText = LoginPageExpected.newUserSignupText;
    await expect(locator).toHaveText(expectedText);
  }

  async fillSignupForm(name: string, email: string) {
    const signupNameInput = this.page.locator(LoginPageLocator.signupNameInput);
    const signupEmailInput = this.page.locator(
      LoginPageLocator.signupEmailInput
    );
    const signupButton = this.page.locator(LoginPageLocator.signupBtn);

    await signupNameInput.fill(name);
    await signupEmailInput.fill(email);
    await signupButton.click();
  }

  async verifySignupErrorEmailAlreadyExists() {
    const locator = this.page.locator(LoginPageLocator.signupErrorMessage);
    await expect(locator).toHaveText(LoginPageExpected.signupEmailAlreadyExist);
  }

  async verifyLoginToYourAccountVisible() {
    const locator = this.page.locator(LoginPageLocator.loginToYourAccountText);
    await expect(locator).toHaveText(LoginPageExpected.loginToYourAccountText);
  }

  async fillLoginForm(email: string, password: string) {
    await this.page.fill(LoginPageLocator.loginEmailInput, email);
    await this.page.fill(LoginPageLocator.loginPasswordInput, password);
  }

  async clickLoginButton() {
    await this.page.click(LoginPageLocator.loginButton);
  }

  async verifyLoginErrorInvalidCredential() {
    const locator = this.page.locator(LoginPageLocator.loginErrorText);
    await expect(locator).toHaveText(LoginPageExpected.loginInvalidText);
  }
}
