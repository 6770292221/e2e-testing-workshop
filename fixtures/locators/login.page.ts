export const LoginPageLocator = {
  newUserSignupText: "text=New User Signup!",
  signupNameInput: '[data-qa="signup-name"]',
  signupEmailInput: '[data-qa="signup-email"]',
  signupBtn: '[data-qa="signup-button"]',
  signupErrorMessage: 'p:has-text("Email Address already exist!")',

  loginToYourAccountText: 'h2:has-text("Login to your account")',
  loginEmailInput: '[data-qa="login-email"]',
  loginPasswordInput: '[data-qa="login-password"]',
  loginButton: '[data-qa="login-button"]',

  loginErrorText: 'p:has-text("Your email or password is incorrect!")',
};
