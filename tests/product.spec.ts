import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { ProductPageExpected } from "../fixtures/expectedResult/product.expect";
import { ProductTestData } from "../fixtures/testData/product.data";

test.describe("Search Product Feature", () => {
  let home: HomePage;
  let product: ProductPage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    product = new ProductPage(page);

    await home.navigateToHome();
    await home.verifyHomePageVisible();
    await home.clickProductsMenu();
    await product.verifyProductPageTitle(ProductPageExpected.allProductsTitle);
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      await page.screenshot({
        path: `screenshots/${testInfo.title}.png`,
        fullPage: true,
      });
      console.log(`Test failed: ${testInfo.title}`);
    }
  });

  test("TC-001 - Search Product - Single Result", async () => {
    const { productName, expectedCount } = ProductTestData.singleResult;

    await product.searchProduct(productName);
    await product.verifyProductPageTitle(
      ProductPageExpected.searchedProductsTitle
    );
    await product.verifySearchResultCount(expectedCount);
    await product.verifySearchedProductName(productName);
  });

  test("TC-002 - Search Product - Multiple Results", async () => {
    const { productName, expectedCount } = ProductTestData.multipleResults;

    await product.searchProduct(productName);
    await product.verifyProductPageTitle(
      ProductPageExpected.searchedProductsTitle
    );
    await product.verifySearchResultCount(expectedCount);
    await product.verifySearchedProductName(productName);
  });

  test("TC-003 - Search Product - No Result", async () => {
    const { productName, expectedCount } = ProductTestData.noResult;

    await product.searchProduct(productName);
    await product.verifyProductPageTitle(
      ProductPageExpected.searchedProductsTitle
    );
    await product.verifySearchResultCount(expectedCount);
  });
});
