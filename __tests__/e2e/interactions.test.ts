import { test, expect, Locator } from "@playwright/test";
import TestHelper from "./TestHelper";
const { describe, beforeEach } = test;

describe("user interaction", () => {
  let testHelper: TestHelper;
  beforeEach(async ({ page }) => {
    await page.goto("/");
    testHelper = new TestHelper(page);
  });

  describe("inputs", () => {
    describe("venueSlug input", () => {
      let venueSlug: Locator;
      beforeEach(() => {
        venueSlug = testHelper.getInput("venueSlug");
      });
      test("venue slug accepts text", async () => {
        await testHelper.fillInput("venueSlug", "test 123");
        await expect(venueSlug).toHaveValue("test 123");
      });
      test("input trims white space from start", async () => {
        const testValue = " test 123";
        await testHelper.fillInput("venueSlug", testValue);
        expect(venueSlug).toHaveValue(testValue.trim());
      });
      test("input trims white space from end", async () => {
        const testValue = "test 123 ";
        await testHelper.fillInput("venueSlug", testValue);
        expect(venueSlug).toHaveValue(testValue.trim());
      });
      test("should have error class if input is empty", async () => {
        await venueSlug.clear();
        const textFieldRoot = venueSlug.locator(".."); // parent div of <Textfield />
        // https://mui.com/material-ui/api/outlined-input/#classes
        await expect(textFieldRoot).toHaveClass(/Mui-error/);
      });
    });
  });
});
