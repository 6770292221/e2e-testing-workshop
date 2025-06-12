import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { RegisterTestData } from "../fixtures/testData/register.data";

test("Register User", async ({ page }) => {
  const user = RegisterTestData.success;
  const loginPage = new LoginPage(page);
  const signupPage = new SignupPage(page);
  const homePage = new HomePage(page);

  await homePage.navigateToHome(); // Step 2
  await homePage.verifyHomePageVisible(); // Step 3
  await homePage.clickSignupLogin(); // Step 4
  await loginPage.verifyNewUserSignupVisible(); // Step 5
  await loginPage.fillSignupForm(user.user.firstName, user.user.email); // Step 6-7
  await signupPage.verifyEnterAccountInformationVisible(); // Step 8

  await signupPage.fillAccountInformation(user.accountInfo); // Step 9-11
  await signupPage.fillAddressInformation(user.user); // Step 12
  await signupPage.createAccount(); // Step 13
  await signupPage.verifyAccountCreatedVisible(); //Step 14
  await signupPage.clickContinue(); // Step 15
  await homePage.verifyLoggedInAs(user.user.firstName); //Step 16
  await homePage.deleteAccount(); // Step 17
  await signupPage.verifyAccountDeletedVisible(); // Step 18
});

test("Register User with existing email", async ({ page }) => {
  const duplicateUser = RegisterTestData.duplicate.user;

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.navigateToHome(); // Step 2
  await homePage.verifyHomePageVisible(); // Step 3
  await homePage.clickSignupLogin(); // Step 4
  await loginPage.verifyNewUserSignupVisible(); // Step 5

  await loginPage.fillSignupForm(duplicateUser.name, duplicateUser.email); // Step 6-7
  await loginPage.verifySignupErrorEmailAlreadyExists(); // Step 8
});
