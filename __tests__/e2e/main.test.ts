import { test, expect } from "@playwright/test";
import SummaryTestHelper from "./SummaryTestHelper";

const { describe, beforeEach } = test;

describe("main", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  describe("renders", () => {
    describe("inputs", async () => {
      test("venue slug input", async ({ page }) => {
        const venueSlugInput = page.getByTestId("venueSlug");
        await expect(venueSlugInput).toBeVisible();
      });
      test("cart value input", async ({ page }) => {
        const cartValueInput = page.getByTestId("cartValue");
        await expect(cartValueInput).toBeVisible();
      });
      test("user latitude", async ({ page }) => {
        const userLatitudeInput = page.getByTestId("userLatitude");
        await expect(userLatitudeInput).toBeVisible();
      });
      test("user longitude", async ({ page }) => {
        const userLongitudeInput = page.getByTestId("userLongitude");
        await expect(userLongitudeInput).toBeVisible();
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
      let summary: SummaryTestHelper;
      beforeEach(({ page }) => {
        summary = new SummaryTestHelper(page);
      });
      test("cart value", async () => {
        await expect(summary.getListItem("Cart value")).toBeVisible();
      });
      test("delivery fee", async () => {
        await expect(summary.getListItem("Delivery fee")).toBeVisible();
      });
      test("delivery distance", async () => {
        await expect(summary.getListItem("Delivery distance")).toBeVisible();
      });
      test("small order surcharge", async () => {
        await expect(
          summary.getListItem("Small order surcharge")
        ).toBeVisible();
      });
      test("total price", async () => {
        await expect(summary.getListItem("Total price")).toBeVisible();
      });
    });
  });
});
