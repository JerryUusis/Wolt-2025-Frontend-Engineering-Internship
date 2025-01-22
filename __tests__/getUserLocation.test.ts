import { getUserLocation } from "../src/utils/library";
import { setGeolocationMocks } from "./testUtils";

describe("getUserLocation()", () => {
  describe("successful callback", () => {
    describe("should call setUserLatitude and setUserLongitude with right values", () => {
      const testValues = [
        { latitude: 60.17094, longitude: 24.93087 }, // Wolt HQ
        { latitude: 60.26089, longitude: 24.85438 }, // The Happy Red Onion
        { latitude: 60.277, longitude: 24.84475 }, // Mika Häkkisen aukio
        { latitude: 60.18796, longitude: 24.96067 }, // Vaasanpuistikko
        { latitude: 60.21664, longitude: 24.98362 }, // Vanhankaupunginkoski
      ];

      beforeEach(() => {
        // Clear any global mocks before each test
        // https://v1.vitest.dev/api/vi.html#vi-clearallmocks
        vi.clearAllMocks();
      });

      afterEach(() => {
        // Reset global navigator object after each test
        // https://v1.vitest.dev/api/vi.html#vi-unstuballglobals
        vi.unstubAllGlobals();
      });

      testValues.forEach(({ latitude, longitude }) => {
        test(`latitude: ${latitude}, longitude: ${longitude}`, () => {
          // Inject Mock in global object so it's accesible in Node environment
          // https://v1.vitest.dev/api/vi#vi-stubglobal
          vi.stubGlobal("navigator", {
            geolocation: {
              getCurrentPosition: setGeolocationMocks(latitude, longitude),
            },
          });
          const setMockLatitude = vi.fn();
          const setMockLongitude = vi.fn();

          getUserLocation(setMockLatitude, setMockLongitude);

          expect(setMockLatitude).toHaveBeenCalledOnce();
          expect(setMockLongitude).toHaveBeenCalledOnce();

          expect(setMockLatitude).toHaveBeenCalledWith(latitude);
          expect(setMockLongitude).toHaveBeenCalledWith(longitude);
        });
      });
    });
  });
});
