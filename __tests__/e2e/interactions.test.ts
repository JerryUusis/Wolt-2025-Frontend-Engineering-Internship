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
      let venueSlugInput: Locator;

      beforeEach(() => {
        venueSlugInput = testHelper.getInput("venueSlug");
      });

      test("accepts text", async () => {
        await testHelper.fillInput("venueSlug", "test 123");
        await expect(venueSlugInput).toHaveValue("test 123");
      });
      test("input trims white space from start", async () => {
        const testValue = " test 123";
        await testHelper.fillInput("venueSlug", testValue);
        expect(venueSlugInput).toHaveValue(testValue.trim());
      });
      test("input trims white space from end", async () => {
        const testValue = "test 123 ";
        await testHelper.fillInput("venueSlug", testValue);
        expect(venueSlugInput).toHaveValue(testValue.trim());
      });
      test("should have error class if input is empty", async () => {
        await venueSlugInput.clear();
        const textFieldRoot = venueSlugInput.locator(".."); // parent div of <Textfield />
        // https://mui.com/material-ui/api/outlined-input/#classes
        await expect(textFieldRoot).toHaveClass(/Mui-error/);
      });
    });
  });
  describe("Cart value", () => {
    let cartValueInput: Locator;
    const cartValueTestId: Partial<InputDataTestId> = "cartValue";

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
      await testHelper.fillInput(cartValueTestId,"-123")
      const textFieldRoot = cartValueInput.locator("..");
      await expect(textFieldRoot).toHaveClass(/Mui-error/);
    });
  });
});
