import { test, expect, Locator } from "@playwright/test";
import TestHelper from "./TestHelper";
import { InputDataTestId } from "../../src/utils/types";
const { describe, beforeEach } = test;

describe("user interaction", () => {
  let testHelper: TestHelper;
  beforeEach(async ({ page }) => {
    await page.goto("/");
    testHelper = new TestHelper(page);
  });

  describe("inputs", () => {
    describe("Venue slug", () => {
      const venueSlugTestId: InputDataTestId = "venueSlug";
      let venueSlugInput: Locator;

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
        expect(venueSlugInput).toHaveValue(testValue.trim());
      });
      test("input trims white space from end", async () => {
        const testValue = "test 123 ";
        await testHelper.fillInput(venueSlugTestId, testValue);
        expect(venueSlugInput).toHaveValue(testValue.trim());
      });
      test("should have error class if input is empty", async () => {
        await venueSlugInput.clear();
        const textFieldRoot = venueSlugInput.locator(".."); // parent div of <Textfield />
        // https://mui.com/material-ui/api/outlined-input/#classes
        await expect(textFieldRoot).toHaveClass(/Mui-error/);
      });
    });
    describe("Cart value", () => {
      let cartValueInput: Locator;
      const cartValueTestId: InputDataTestId = "cartValue";

      beforeEach(() => {
        cartValueInput = testHelper.getInput(cartValueTestId);
      });

      test("should accept integer value", async () => {
        await testHelper.fillInput(cartValueTestId, "123");
        expect(cartValueInput).toHaveValue("123");
      });
      test("should accept float value", async () => {
        await testHelper.fillInput(cartValueTestId, "1.23");
        expect(cartValueInput).toHaveValue("1.23");
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
      let latitudeInput: Locator;
      const latitudeTestId: InputDataTestId = "userLatitude";
      let longitudeInput: Locator;
      const longitudeTestId: InputDataTestId = "userLongitude";

      beforeEach(async () => {
        latitudeInput = testHelper.getInput(latitudeTestId);
        longitudeInput = testHelper.getInput(longitudeTestId);
      });

      describe("latitude input", () => {
        test("should accept integer value", async () => {
          await testHelper.fillInput(latitudeTestId, "123");
          expect(latitudeInput).toHaveValue("123");
        });
        test("should accept float value", async () => {
          await testHelper.fillInput(latitudeTestId, "1.23");
          expect(latitudeInput).toHaveValue("1.23");
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
          expect(longitudeInput).toHaveValue("123");
        });
        test("should accept float value", async () => {
          await testHelper.fillInput(longitudeTestId, "1.23");
          expect(longitudeInput).toHaveValue("1.23");
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
