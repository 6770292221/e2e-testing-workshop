import { Page, expect } from "@playwright/test";
import { SignupPageLocator } from "../fixtures/locators/signup.page";
import { SignupPageExpected } from "../fixtures/expectedResult/signup.expect";

type DOB = { day: string; month: string; year: string };
type AccountInfo = {
  title: "Mr" | "Mrs";
  password: string;
  dob: DOB;
  subscribeNewsletter: boolean;
  receiveOffers: boolean;
};

type AddressInfo = {
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  mobile: string;
};

export class SignupPage {
  constructor(private page: Page) {}

  async verifyEnterAccountInformationVisible() {
    const locator = this.page.locator(SignupPageLocator.enterAccountInfoText);
    const expectedText = SignupPageExpected.enterAccountInfoText;
    await expect(locator).toHaveText(expectedText);
  }

  async verifyAccountCreatedVisible() {
    const locator = this.page.locator(SignupPageLocator.accountCreatedText);
    const expected = SignupPageExpected.accountCreatedText;
    await expect(locator).toHaveText(expected);
  }

  async fillAccountInformation(info: AccountInfo) {
    await this.fillTitle(info.title);
    await this.fillPassword(info.password);
    await this.fillDateOfBirth(info.dob);
    await this.fillCheckboxes(info.subscribeNewsletter, info.receiveOffers);
  }

  private async fillTitle(title: "Mr" | "Mrs") {
    await this.page.check(
      title === "Mr"
        ? SignupPageLocator.titleMrRadio
        : SignupPageLocator.titleMrsRadio
    );
  }

  private async fillPassword(password: string) {
    await this.page.fill(SignupPageLocator.passwordInput, password);
  }

  private async fillDateOfBirth(dob: DOB) {
    await this.page.selectOption(SignupPageLocator.daySelect, dob.day);
    await this.page.selectOption(SignupPageLocator.monthSelect, dob.month);
    await this.page.selectOption(SignupPageLocator.yearSelect, dob.year);
  }

  private async fillCheckboxes(newsletter: boolean, offers: boolean) {
    if (newsletter) {
      await this.page.check(SignupPageLocator.newsletterCheckbox);
    }
    if (offers) {
      await this.page.check(SignupPageLocator.offersCheckbox);
    }
  }

  async fillAddressInformation(user: AddressInfo) {
    await this.fillName(user.firstName, user.lastName);
    await this.fillCompanyAndAddress(
      user.company,
      user.address1,
      user.address2
    );
    await this.fillLocation(user.country, user.state, user.city, user.zip);
    await this.fillMobile(user.mobile);
  }

  // --- 🔽 เมธอดย่อยที่แยกจาก fillAddressInformation ---

  private async fillName(firstName: string, lastName: string) {
    await this.page.fill(SignupPageLocator.firstNameInput, firstName);
    await this.page.fill(SignupPageLocator.lastNameInput, lastName);
  }

  private async fillCompanyAndAddress(
    company: string,
    address1: string,
    address2: string
  ) {
    await this.page.fill(SignupPageLocator.companyInput, company);
    await this.page.fill(SignupPageLocator.address1Input, address1);
    await this.page.fill(SignupPageLocator.address2Input, address2);
  }

  private async fillLocation(
    country: string,
    state: string,
    city: string,
    zip: string
  ) {
    await this.page.selectOption(SignupPageLocator.countrySelect, country);
    await this.page.fill(SignupPageLocator.stateInput, state);
    await this.page.fill(SignupPageLocator.cityInput, city);
    await this.page.fill(SignupPageLocator.zipcodeInput, zip);
  }

  private async fillMobile(mobile: string) {
    await this.page.fill(SignupPageLocator.mobileInput, mobile);
  }

  async createAccount() {
    await this.page.click(SignupPageLocator.createAccountButton);
  }

  async clickContinue() {
    await this.page.click(SignupPageLocator.continueButton);
  }

  async verifyAccountDeletedVisible() {
    const locator = this.page.locator(SignupPageLocator.accountDeletedText);
    const expectedText = SignupPageExpected.accountDeletedText;
    await expect(locator).toHaveText(expectedText);
  }
}
