import { getSurcharge } from "../../src/utils/library";

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

export const testCoordinateValuesArray = [
  { latitude: 60.17094, longitude: 24.93087 }, // Wolt HQ
  { latitude: 60.18796, longitude: 24.96067 }, // Vaasanpuistikko
  { latitude: 60.26089, longitude: 24.85438 }, // The Happy Red Onion
  { latitude: 60.277, longitude: 24.84475 }, // Mika Häkkisen aukio
  { latitude: 60.21664, longitude: 24.98362 }, // Vanhankaupunginkoski
];
