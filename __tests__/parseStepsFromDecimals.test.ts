import { parseStepsFromDecimals } from "../src/utils/library";

describe("parseStepsFromDecimals()", () => {
  describe("should return right amount of decimals", () => {
    for (let i = 0; i < 10; i++) {
      const expectedResult = (1 / Math.pow(10, i)).toString();
      test(`expected return value: ${expectedResult}`, () => {
        const result = parseStepsFromDecimals(i);
        expect(result).toBe(expectedResult);
      });
    }
  });

  describe("should throw error with negative value", () => {
    test("decimals: -1", () => {
      expect(() => {
        parseStepsFromDecimals(-1);
      }).toThrowError("parameter can't be negative");
    });
  });

  describe("should throw error if parameter is not integer", () => {
    test("parameter is 1.5", () => {
      expect(() => parseStepsFromDecimals(1.5)).toThrowError(
        "parameter must be an integer"
      );
    });
    test("parameter is NaN", () => {
      expect(() => parseStepsFromDecimals(NaN)).toThrowError(
        "parameter must be an integer"
      );
    });
  });
});
