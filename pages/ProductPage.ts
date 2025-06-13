import { Page, expect } from "@playwright/test";
import { ProductPageLocator } from "../fixtures/locators/product.page";

export class ProductPage {
  constructor(private page: Page) {}

  async searchProduct(productName: string) {
    await this.page.fill(ProductPageLocator.searchInput, productName);
    await this.page.click(ProductPageLocator.searchButton);
  }

  async verifySearchResultCount(expectedCount: number) {
    const results = this.page.locator(ProductPageLocator.productItem);
    const count = await results.count();

    expect(count).toBe(expectedCount);

    if (expectedCount > 0) {
      await expect(results.first()).toBeVisible();
    }
  }

  async verifyProductPageTitle(expectedTitle: string) {
    const title = this.page.locator(ProductPageLocator.productsTitle);
    await expect(title).toBeVisible();
    await expect(title).toHaveText(expectedTitle);
  }

  async verifySearchedProductName(partialKeyword: string) {
    const names = await this.page
      .locator(ProductPageLocator.productItemName)
      .allTextContents();

    for (const name of names) {
      expect(name.toLowerCase()).toContain(partialKeyword.toLowerCase());
    }
  }
}
