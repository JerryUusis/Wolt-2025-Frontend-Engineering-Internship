import { test, expect } from "@playwright/test";
import TestHelper from "./TestHelper";
const { describe, beforeEach } = test;

describe("Calculate delivery fee", () => {
  let testHelper: TestHelper;

  beforeEach(async ({ page }) => {
    await page.goto("/");
    testHelper = new TestHelper(page);
  });

  describe("success", () => {
    test("valid data", async () => {
      await testHelper.calculateTotal("10", "60.17094", "24.93087");
      const total = testHelper.getListItem("Total price");
      await expect(total).toHaveText(/11,90/);
      await expect(
        total.locator(".MuiListItemSecondaryAction-root span")
      ).toHaveAttribute("data-raw-value", "1190");
    });
  });
  describe("errors", () => {});
});
