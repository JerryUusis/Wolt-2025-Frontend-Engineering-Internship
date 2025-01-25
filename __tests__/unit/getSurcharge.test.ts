import { getSurcharge } from "../../src/utils/library";
import { testGetSurchargeWithTestValues } from "./testUtils";
import { SurchargeTestObject } from "./testUtils";

describe("getSurcharge()", () => {
  describe("should return 0 if cartValueIncents if >= maxValue", () => {
    const testValues: SurchargeTestObject[] = [
      { maxValue: 1000, cartValueInCents: 1100, returnValue: 0 },
      { maxValue: 1000, cartValueInCents: 1099, returnValue: 0 },
      { maxValue: 1000, cartValueInCents: 1050, returnValue: 0 },
      { maxValue: 1001, cartValueInCents: 1002, returnValue: 0 },
      { maxValue: 100000, cartValueInCents: 100001, returnValue: 0 },
      { maxValue: 0, cartValueInCents: 0, returnValue: 0 },
      { maxValue: 0, cartValueInCents: 1, returnValue: 0 },
      { maxValue: 1, cartValueInCents: 2, returnValue: 0 },
    ];
    testGetSurchargeWithTestValues(testValues);
  });

  describe("should throw error if parameter is negative", () => {
    const testValues: SurchargeTestObject[] = [
      { maxValue: -1, cartValueInCents: 11 },
      { maxValue: 10, cartValueInCents: -1 },
      { maxValue: -11, cartValueInCents: -11 },
    ];
    testValues.forEach(({ maxValue, cartValueInCents }) => {
      test(`maxValue: ${maxValue} cartValueInCents:${cartValueInCents}`, () => {
        expect(() => {
          getSurcharge(cartValueInCents, maxValue);
        }).toThrowError("parameters can't have negative value");
      });
    });
    test("should throw error cartValue is NaN", () => {
      expect(() => getSurcharge(NaN, 1000)).toThrowError(
        "cart value is missing value"
      );
    });
  });

  describe("should return small surcharge (maxValue - cartValueInCents)", () => {
    const testValues: SurchargeTestObject[] = [
      { maxValue: 1000, cartValueInCents: 999 },
      { maxValue: 500, cartValueInCents: 400 },
      { maxValue: 300, cartValueInCents: 250 },
      { maxValue: 100, cartValueInCents: 50 },
      { maxValue: 50, cartValueInCents: 25 },
      { maxValue: 1, cartValueInCents: 0 },
    ].map(({ maxValue, cartValueInCents }) => ({
      maxValue,
      cartValueInCents,
      returnValue: maxValue - cartValueInCents,
    }));
    testGetSurchargeWithTestValues(testValues);
  });
});
