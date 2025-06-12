import { test } from "@playwright/test";
import { RegisterTestData } from "../fixtures/testData/register.data";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";

test("Login User with correct email and password", async ({ page }) => {
  const user = RegisterTestData.login;

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page); // สำหรับ delete/account deleted

  await homePage.navigateToHome(); // Step 2
  await homePage.verifyHomePageVisible(); // Step 3
  await homePage.clickSignupLogin(); // Step 4

  await loginPage.verifyLoginToYourAccountVisible(); // Step 5
  await loginPage.fillLoginForm(user.email, user.password); // Step 6-7
  await loginPage.clickLoginButton(); // Step 8
  await homePage.verifyLoggedInAs(user.firstName); // Step 9
});

test("Login User with incorrect email and password", async ({ page }) => {
  const user = RegisterTestData.loginInvalid;

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigateToHome(); // Step 2
  await homePage.verifyHomePageVisible(); // Step 3
  await homePage.clickSignupLogin(); // Step 4

  await loginPage.verifyLoginToYourAccountVisible(); // Step 5
  await loginPage.fillLoginForm(user.email, user.password); // Step 6
  await loginPage.clickLoginButton(); // Step 7

  await loginPage.verifyLoginErrorInvalidCredential(); // Step 8
});
