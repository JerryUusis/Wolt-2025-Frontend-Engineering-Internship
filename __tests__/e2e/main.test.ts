import { test, expect, selectors } from "@playwright/test";

const { describe, beforeEach } = test;

describe("main", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  describe("renders inputs", async () => {
    test("venue slug input", async ({ page }) => {
      const venueSlugInput = page.getByTestId("venueSlug");
      expect(venueSlugInput).toBeVisible();
    });
    test("cart value input", async ({ page }) => {
      const cartValueInput = page.getByTestId("cartValue");
      expect(cartValueInput).toBeVisible();
    });
    test("user latitude", async ({ page }) => {
      const userLatitudeInput = page.getByTestId("userLatitude");
      expect(userLatitudeInput).toBeVisible();
    });
    test("user longitude", async ({ page }) => {
      const userLongitudeInput = page.getByTestId("userLongitude");
      expect(userLongitudeInput).toBeVisible();
    });
  });
});
