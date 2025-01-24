import { test, expect } from "@playwright/test";
import TestHelper from "./TestHelper";
const { describe, beforeEach } = test;

describe("renders", () => {
  let testHelper: TestHelper;
  beforeEach(async ({ page }) => {
    await page.goto("/");
    testHelper = new TestHelper(page);
  });
  describe("inputs", () => {
    test("venue slug input", async () => {
      await expect(testHelper.getInput("venueSlug")).toBeVisible();
    });
    test("cart value input", async () => {
      await expect(testHelper.getInput("cartValue")).toBeVisible();
    });
    test("user latitude", () => {
      expect(testHelper.getInput("userLatitude"));
    });
    test("user longitude", async () => {
      await expect(testHelper.getInput("userLongitude")).toBeVisible();
    });
  });

  describe("buttons", () => {
    test("location button", async ({ page }) => {
      const locationButton = page.getByTestId("locationButton");
      await expect(locationButton).toBeVisible();
    });
    test("calculate delivery button", async ({ page }) => {
      const calculateButton = page.getByTestId("calculateDeliveryFeeButton");
      await expect(calculateButton).toBeVisible();
    });
  });

  describe("summary", () => {
    test("cart value", async () => {
      await expect(testHelper.getListItem("Cart value")).toBeVisible();
    });
    test("delivery fee", async () => {
      await expect(testHelper.getListItem("Delivery fee")).toBeVisible();
    });
    test("delivery distance", async () => {
      await expect(testHelper.getListItem("Delivery distance")).toBeVisible();
    });
    test("small order surcharge", async () => {
      await expect(
        testHelper.getListItem("Small order surcharge")
      ).toBeVisible();
    });
    test("total price", async () => {
      await expect(testHelper.getListItem("Total price")).toBeVisible();
    });
  });
});
