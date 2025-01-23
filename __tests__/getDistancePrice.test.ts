import { getDistancePrice } from "../src/utils/library";
import { DistanceRangeObject } from "../src/utils/types";

describe("getDistancePrice()", () => {
  const testData: DistanceRangeObject[] = [
    {
      min: 0,
      max: 500,
      a: 0,
      b: 0,
      flag: null,
    },
    {
      min: 500,
      max: 1000,
      a: 100,
      b: 0,
      flag: null,
    },
    {
      min: 1000,
      max: 1500,
      a: 200,
      b: 0,
      flag: null,
    },
    {
      min: 1500,
      max: 2000,
      a: 200,
      b: 1,
      flag: null,
    },
    {
      min: 2000,
      max: 0,
      a: 0,
      b: 0,
      flag: null,
    },
  ];

  describe("distance is ", () => {
    const basePrice = 199;
    const lastIndex = testData.length - 1;
    describe("more or equal to min when 'max=0' value in the last object", () => {
      let straightLineDistance = testData[lastIndex].min;
      test("equal to min", () => {
        const errorMessage = `Distance price unavailable: Straight line distance: ${straightLineDistance}m can't be greater than max: ${testData[lastIndex].min}m`;
        expect(() =>
          getDistancePrice(straightLineDistance, testData, basePrice)
        ).toThrowError(errorMessage);
      });
      test("more than min", () => {
        straightLineDistance += 1;
        const errorMessage = `Distance price unavailable: Straight line distance: ${straightLineDistance}m can't be greater than max: ${testData[lastIndex].min}m`;
        expect(() =>
          getDistancePrice(straightLineDistance, testData, basePrice)
        ).toThrowError(errorMessage);
      });
      test("is NaN number", () => {
        expect(() => getDistancePrice(NaN, testData, basePrice)).toThrowError(
          "Straight line distance must be positive integer"
        );
      });
      test("a negative number", () => {
        expect(() => getDistancePrice(-10, testData, basePrice)).toThrowError(
          "Straight line distance must be positive integer"
        );
      });
    });

    const testRangesFromDistanceObject = (
      testRangesArray: number[],
      distanceRangeObject: DistanceRangeObject
    ) => {
      const { min, max, a, b } = distanceRangeObject;
      testRangesArray.forEach((distance) => {
        const expectedResult = Math.round(basePrice + a + (b * distance) / 10);
        test(`distance: ${distance}, min:${min}, max: ${max} should return ${expectedResult}`, () => {
          const result = getDistancePrice(distance, testData, basePrice);
          expect(result).toEqual(expectedResult);
        });
      });
    };

    describe("straight line distance is between min and max ranges", () => {
      describe("1st object", () => {
        testRangesFromDistanceObject(
          [0, 1, 100, 200, 300, 400, 499],
          testData[0]
        );
      });
      describe("2nd object", () => {
        testRangesFromDistanceObject(
          [500, 501, 600, 700, 800, 900, 999],
          testData[1]
        );
      });
      describe("3nd object", () => {
        testRangesFromDistanceObject(
          [1000, 1001, 1100, 1200, 1300, 1400, 1499],
          testData[2]
        );
      });
      describe("4th object", () => {
        testRangesFromDistanceObject(
          [1500, 1501, 1600, 1700, 1800, 1900, 1999],
          testData[3]
        );
      });
    });
  });
});
