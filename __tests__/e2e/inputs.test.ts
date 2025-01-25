import { test, expect, Locator } from "@playwright/test";
import TestHelper from "./TestHelper";
import { InputDataTestId } from "../../src/utils/types";
const { describe, beforeEach } = test;

describe("user interaction", () => {
  let testHelper: TestHelper;
  let venueSlugInput: Locator;
  const venueSlugTestId: InputDataTestId = "venueSlug";
  let cartValueInput: Locator;
  const cartValueTestId: InputDataTestId = "cartValue";
  let latitudeInput: Locator;
  const latitudeTestId: InputDataTestId = "userLatitude";
  let longitudeInput: Locator;
  const longitudeTestId: InputDataTestId = "userLongitude";

  beforeEach(async ({ page }) => {
    await page.goto("/");
    testHelper = new TestHelper(page);
  });

  describe("inputs", () => {
    describe("Venue slug", () => {
      beforeEach(() => {
        venueSlugInput = testHelper.getInput(venueSlugTestId);
      });

      test("accepts text", async () => {
        await testHelper.fillInput(venueSlugTestId, "test 123");
        await expect(venueSlugInput).toHaveValue("test 123");
      });
      test("input trims white space from start", async () => {
        const testValue = " test 123";
        await testHelper.fillInput(venueSlugTestId, testValue);
        await expect(venueSlugInput).toHaveValue(testValue.trim());
      });
      test("input trims white space from end", async () => {
        const testValue = "test 123 ";
        await testHelper.fillInput(venueSlugTestId, testValue);
        await expect(venueSlugInput).toHaveValue(testValue.trim());
      });
      test("should have error class if input is empty", async () => {
        await venueSlugInput.clear();
        const textFieldRoot = venueSlugInput.locator(".."); // parent div of <Textfield />
        // https://mui.com/material-ui/api/outlined-input/#classes
        await expect(textFieldRoot).toHaveClass(/Mui-error/);
      });
    });

    describe("Cart value", () => {
      beforeEach(() => {
        cartValueInput = testHelper.getInput(cartValueTestId);
      });

      test("should accept integer value", async () => {
        await testHelper.fillInput(cartValueTestId, "123");
        await expect(cartValueInput).toHaveValue("123");
      });
      test("should accept float value", async () => {
        await testHelper.fillInput(cartValueTestId, "1.23");
        await expect(cartValueInput).toHaveValue("1.23");
      });
      test("should have error class if input is empty", async () => {
        await cartValueInput.clear();
        const textFieldRoot = cartValueInput.locator("..");
        await expect(textFieldRoot).toHaveClass(/Mui-error/);
      });
      test("should have error class if input value is negative number", async () => {
        await testHelper.fillInput(cartValueTestId, "-123");
        const textFieldRoot = cartValueInput.locator("..");
        await expect(textFieldRoot).toHaveClass(/Mui-error/);
      });
    });

    describe("Coordinate inputs", () => {
      beforeEach(async () => {
        latitudeInput = testHelper.getInput(latitudeTestId);
        longitudeInput = testHelper.getInput(longitudeTestId);
      });

      describe("use 'Get location' button to get values", () => {
        test("clicking 'Get location' fills inputs with current coordinates", async ({
          page,
        }) => {
          const locationButton = page.getByRole("button", {
            name: "Get location",
          });
          await locationButton.click();

          await expect(latitudeInput).toHaveValue("60.17094");
          await expect(longitudeInput).toHaveValue("24.93087");
        });
        test("user doesn't grant permission", async ({ page, context }) => {
          await context.clearPermissions(); // Clear permissions set in the config file for this test
          // Omit success callback and mock the geolocation position error
          // https://playwright.dev/docs/api/class-page#page-evaluate
          await page.evaluate(() => {
            navigator.geolocation.getCurrentPosition = (_, reject) => {
              if (reject) {
                reject({
                  code: 1,
                  message: "User denied Geolocation",
                  PERMISSION_DENIED: 1,
                  POSITION_UNAVAILABLE: 2,
                  TIMEOUT: 3,
                });
              }
            };
          });

          const locationButton = page.getByRole("button", {
            name: "Get location",
          });
          await locationButton.click();

          const alertMessage = testHelper.getElementWithTestId("alertMessage");
          await alertMessage.waitFor({ state: "visible" });
          await expect(alertMessage).toBeVisible();
          await expect(alertMessage).toHaveText("User denied Geolocation");
        });
      });

      describe("latitude input", () => {
        test("should accept integer value", async () => {
          await testHelper.fillInput(latitudeTestId, "123");
          await expect(latitudeInput).toHaveValue("123");
        });
        test("should accept float value", async () => {
          await testHelper.fillInput(latitudeTestId, "1.23");
          await expect(latitudeInput).toHaveValue("1.23");
        });
        test("should have error class if input is empty", async () => {
          await latitudeInput.clear();
          const textFieldRoot = latitudeInput.locator("..");
          await expect(textFieldRoot).toHaveClass(/Mui-error/);
        });
        test("should have error class if input value is greater than 90", async () => {
          await testHelper.fillInput(latitudeTestId, "91");
          const textFieldRoot = latitudeInput.locator("..");
          await expect(textFieldRoot).toHaveClass(/Mui-error/);
        });
        test("should have error class if input value is lower than -90", async () => {
          await testHelper.fillInput(latitudeTestId, "-91");
          const textFieldRoot = latitudeInput.locator("..");
          await expect(textFieldRoot).toHaveClass(/Mui-error/);
        });
      });

      describe("longitude input", () => {
        test("should accept integer value", async () => {
          await testHelper.fillInput(longitudeTestId, "123");
          await expect(longitudeInput).toHaveValue("123");
        });
        test("should accept float value", async () => {
          await testHelper.fillInput(longitudeTestId, "1.23");
          await expect(longitudeInput).toHaveValue("1.23");
        });
        test("should have error class if input is empty", async () => {
          await longitudeInput.clear();
          const textFieldRoot = longitudeInput.locator("..");
          await expect(textFieldRoot).toHaveClass(/Mui-error/);
        });
        test("should have error class if input value is greater than 180", async () => {
          await testHelper.fillInput(longitudeTestId, "181");
          const textFieldRoot = longitudeInput.locator("..");
          await expect(textFieldRoot).toHaveClass(/Mui-error/);
        });
        test("should have error class if input value is lower than -180", async () => {
          await testHelper.fillInput(longitudeTestId, "-181");
          const textFieldRoot = longitudeInput.locator("..");
          await expect(textFieldRoot).toHaveClass(/Mui-error/);
        });
      });
    });
  });
});
