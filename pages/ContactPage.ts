import { Page, expect } from "@playwright/test";
import { ContactPageLocator } from "../fixtures/locators/contact.page";
import { ContactPageExpected } from "../fixtures/expectedResult/contact.expect";
import { HomePage } from "./HomePage";

type ContactFormData = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export class ContactPage {
  constructor(private page: Page) {}

  async verifyGetInTouchVisible() {
    await expect(
      this.page.locator(ContactPageLocator.getInTouchText)
    ).toHaveText(ContactPageExpected.getInTouchText);
  }

  async clickContactUs() {
    await this.page.click(ContactPageLocator.contactUsLink);
  }

  async fillContactForm(formData: ContactFormData) {
    if (formData.name !== undefined) {
      await this.page.fill(ContactPageLocator.nameInput, formData.name);
    }
    if (formData.email !== undefined) {
      await this.page.fill(ContactPageLocator.emailInput, formData.email);
    }
    if (formData.subject !== undefined) {
      await this.page.fill(ContactPageLocator.subjectInput, formData.subject);
    }
    if (formData.message !== undefined) {
      await this.page.fill(ContactPageLocator.messageInput, formData.message);
    }
  }

  async uploadFile(filePath: string) {
    await this.page.setInputFiles(ContactPageLocator.uploadFileInput, filePath);
  }

  async submitFormAndAcceptAlert() {
    await this.page.once("dialog", async (dialog) => {
      console.log("Accepting dialog:", dialog.message());
      await dialog.accept();
    });

    await this.page.click('input[type="submit"]');
  }

  async verifySuccessMessageVisible() {
    await expect(
      this.page.locator(ContactPageLocator.successMessage)
    ).toHaveText(ContactPageExpected.successMessage);
  }

  async clickHomeAndVerifyRedirected() {
    await this.page.click(ContactPageLocator.homeButton);

    // ใช้ HomePage ช่วย verify
    const homePage = new HomePage(this.page);
    await homePage.verifyHomePageVisible();
  }
}
