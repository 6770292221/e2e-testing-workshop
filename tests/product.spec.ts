import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { ProductPageExpected } from "../fixtures/expectedResult/product.expect";

/**
 * TC-001  ค้นหาสินค้าที่มีผลลัพธ์เดียว
 */
test("Search Product - Single Result", async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);

  const name = "little girls mr. panda shirt";
  const expectedCount = 1;

  await home.navigateToHome();
  await home.verifyHomePageVisible();
  await home.clickProductsMenu();

  await product.verifyProductPageTitle(ProductPageExpected.allProductsTitle);
  await product.searchProduct(name);
  await product.verifyProductPageTitle(
    ProductPageExpected.searchedProductsTitle
  );
  await product.verifySearchResultCount(expectedCount);
  await product.verifySearchedProductName(name); // ตรงชื่อ 100 %
});

/**
 * TC-002  ค้นหาด้วยคีย์เวิร์ดที่ตรง “บางส่วน” แล้วได้หลายผล
 */
test("Search Product - Multiple Results", async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);

  const name = "Top";
  const expectedCount = 14;

  await home.navigateToHome();
  await home.verifyHomePageVisible();
  await home.clickProductsMenu();

  await product.verifyProductPageTitle(ProductPageExpected.allProductsTitle);
  await product.searchProduct(name);
  await product.verifyProductPageTitle(
    ProductPageExpected.searchedProductsTitle
  );
  await product.verifySearchResultCount(expectedCount);
  await product.verifySearchedProductName(name);
});

/**
 * TC-003  ค้นหาสินค้าที่ “ไม่มีในระบบ” แล้วต้องแสดง empty-state ถูกต้อง
 */

test("Search Product - No Result", async ({ page }) => {
  const home = new HomePage(page);
  const product = new ProductPage(page);

  const name = "XXXX";
  const expectedCount = 0;

  await home.navigateToHome();
  await home.verifyHomePageVisible();
  await home.clickProductsMenu();

  await product.verifyProductPageTitle(ProductPageExpected.allProductsTitle);
  await product.searchProduct(name);
  await product.verifyProductPageTitle(
    ProductPageExpected.searchedProductsTitle
  );
  await product.verifySearchResultCount(expectedCount);
});
