import { getSurcharge } from "../src/utils/library";

export interface SurchargeTestObject {
  maxValue: number;
  cartValueInCents: number;
  returnValue?: number;
}

// Insert test values in an array and test them with 
export const testGetSurchargeWithTestValues = (
  testValuesArray: SurchargeTestObject[]
) => {
  testValuesArray.forEach(({ maxValue, cartValueInCents, returnValue }) => {
    test(`maxValue: ${maxValue} cartValueInCents:${cartValueInCents} returnValue: ${returnValue}`, () => {
      const result = getSurcharge(cartValueInCents, maxValue);
      expect(result).toBe(returnValue);
    });
  });
};
