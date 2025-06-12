export const RegisterTestData = {
  success: {
    accountInfo: {
      title: "Mr" as const,
      password: "Test1234",
      dob: {
        day: "1",
        month: "1",
        year: "1990",
      },
      subscribeNewsletter: true,
      receiveOffers: true,
    },
    user: {
      name: "TestUser",
      email: `test_${Date.now()}@mail.com`,
      firstName: "John",
      lastName: "Doe",
      company: "Company",
      address1: "123 St",
      address2: "",
      country: "Canada",
      state: "ON",
      city: "Toronto",
      zip: "12345",
      mobile: "1234567890",
    },
  },

  duplicate: {
    user: {
      name: "TestUser",
      email: "test_1749643783868@mail.com",
    },
  },
  login: {
    email: "test_1749643783868@mail.com",
    password: "Test1234",
    firstName: "John",
  },

  loginInvalid: {
    email: "wronguser@mail.com",
    password: "wrongpass",
  },
};
