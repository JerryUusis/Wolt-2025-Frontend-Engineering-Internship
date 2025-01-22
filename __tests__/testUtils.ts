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

// https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
type SuccessCallback = (position: GeolocationPosition) => void;

// Create a mock function for the geolocation wit custom location
export const setGeolocationMocks = (latitude: number, longitude: number) => {
  const mockGetCurrenPosition = vi.fn((successCallback: SuccessCallback) => {
    successCallback({
      coords: {
        latitude: latitude,
        longitude: longitude,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
        toJSON: function () {
          throw new Error("Function not implemented.");
        },
      },
      timestamp: Date.now(),
      toJSON: function () {
        throw new Error("Function not implemented.");
      },
    });
  });
  return mockGetCurrenPosition;
};
