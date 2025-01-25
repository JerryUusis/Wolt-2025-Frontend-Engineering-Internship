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
    test("use 'Get location' button and calculate total", async () => {
      await testHelper.calculateTotal(cartValue);
      const total = testHelper.getListItem("Total price");
      await expect(total).toHaveText(/11,90/);
    });
  });

  describe("errors", () => {
    test("venue is too far from user location", async ({ context }) => {
      // From north pole to Wolt HQ Helsinki
      context.setGeolocation({
        latitude: 90,
        longitude: 0,
      });
      await testHelper.calculateTotal("10");

      await errorMessage.waitFor({ state: "visible" });
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText(
        /can't be greater than venue max: 2000m/
      );
    });
    test("cart value input is empty", async () => {
      await testHelper.fillInput("cartValue", "");
      await testHelper.fillInput("userLatitude", latitude);
      await testHelper.fillInput("userLongitude", longitude);

      await testHelper.pressCalculateButton();

      await errorMessage.waitFor({ state: "visible" });
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText("cart value is missing value");
    });
    test("latitude input is empty", async () => {
      await testHelper.fillInput("cartValue", cartValue);
      await testHelper.fillInput("userLatitude", "");
      await testHelper.fillInput("userLongitude", longitude);

      await testHelper.pressCalculateButton();
      await errorMessage.waitFor({ state: "visible" });
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText("latitude must be a valid number");
    });
    test("longitude input is empty", async () => {
      await testHelper.fillInput("cartValue", cartValue);
      await testHelper.fillInput("userLatitude", latitude);
      await testHelper.fillInput("userLongitude", "");

      await testHelper.pressCalculateButton();

      await errorMessage.waitFor({ state: "visible" });
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toHaveText("longitude must be a valid number");
    });
  });
});
