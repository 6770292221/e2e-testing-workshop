export const SignupPageLocator = {
  // --- Step 8: Header text ---
  enterAccountInfoText: 'h2:has-text("Enter Account Information")',
  accountCreatedText: 'h2:has-text("ACCOUNT CREATED!")',
  accountDeletedText: 'h2:has-text("ACCOUNT DELETED!")',

  // --- Step 9: Account Info ---
  titleMrRadio: "#id_gender1",
  titleMrsRadio: "#id_gender2",
  passwordInput: "#password",
  daySelect: "#days",
  monthSelect: "#months",
  yearSelect: "#years",
  newsletterCheckbox: "#newsletter",
  offersCheckbox: "#optin",

  // --- Step 10–11: Address Info ---
  firstNameInput: "#first_name",
  lastNameInput: "#last_name",
  companyInput: "#company",
  address1Input: "#address1",
  address2Input: "#address2",
  countrySelect: "#country",
  stateInput: "#state",
  cityInput: "#city",
  zipcodeInput: "#zipcode",
  mobileInput: "#mobile_number",

  // --- Step 12: Create Account ---
  createAccountButton: '[data-qa="create-account"]',

  // --- Step 13: Continue ---
  continueButton: 'a[data-qa="continue-button"], .btn.btn-primary',
};
