import { test, expect, Locator } from "@playwright/test";
import TestHelper from "./TestHelper";
const { describe, beforeEach } = test;

describe("Calculate delivery fee", () => {
  let testHelper: TestHelper;
  let errorMessage: Locator;

  const validValues = {
    cartValue: "10",
    latitude: "60.17094",
    longitude: "24.93087",
  };
  const { cartValue, latitude, longitude } = validValues;

  beforeEach(async ({ page }) => {
    await page.goto("/");
    testHelper = new TestHelper(page);
    errorMessage = testHelper.getElementWithTestId("alertMessage");
  });

  describe("success", () => {
    test("valid data", async () => {
      await testHelper.calculateTotal(cartValue, latitude, longitude);
      const total = testHelper.getListItem("Total price");
      await expect(total).toHaveText(/11,90/);
      await expect(
        total.locator(".MuiListItemSecondaryAction-root span")
      ).toHaveAttribute("data-raw-value", "1190");
    });
  });

  describe("errors", () => {
    test("cart value input is empty", async () => {
      await testHelper.calculateTotal("", latitude, longitude);
      await errorMessage.waitFor({ state: "visible" });
      await expect(errorMessage).toBeVisible();
     await expect(errorMessage).toHaveText("cart value is missing value");
    });
    test("latitude input is empty", async () => {
      await testHelper.calculateTotal(cartValue, "", longitude);
      await errorMessage.waitFor({ state: "visible" });
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText("latitude must be a valid number");
    });
    test("longitude input is empty", async () => {
      await testHelper.calculateTotal(cartValue, latitude, "");
      await errorMessage.waitFor({ state: "visible" });
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText("longitude must be a valid number");
    });
  });
});
