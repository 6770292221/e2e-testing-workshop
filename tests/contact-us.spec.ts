import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ContactPage } from "../pages/ContactPage";

test("Contact Us Form", async ({ page }) => {
  const homePage = new HomePage(page);
  const contactPage = new ContactPage(page);
  const filePath = "assets/testfile.txt";

  await homePage.navigateToHome(); // Step 2
  await homePage.verifyHomePageVisible(); // Step 3

  await contactPage.clickContactUs(); // Step 4
  await contactPage.verifyGetInTouchVisible(); // Step 5

  await contactPage.fillContactForm({
    name: "John",
    email: "john@example.com",
    message: "Hi there!",
    subject: "AAAA",
  });

  // Step 6
  await contactPage.uploadFile(filePath); // Step 7
  await contactPage.submitFormAndAcceptAlert(); // Step 8–9
  await contactPage.verifySuccessMessageVisible(); // Step 10
  await contactPage.clickHomeAndVerifyRedirected(); // Step 11
});
