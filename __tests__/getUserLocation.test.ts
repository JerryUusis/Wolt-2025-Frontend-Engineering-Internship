import { getUserLocation } from "../src/utils/library";
import { setGeolocationMocks } from "./testUtils";

describe("getUserLocation()", () => {
  const setMockLatitude = vi.fn();
  const setMockLongitude = vi.fn();
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

  describe("successful callback", () => {
    const testValues = [
      { latitude: 60.17094, longitude: 24.93087 }, // Wolt HQ
      { latitude: 60.26089, longitude: 24.85438 }, // The Happy Red Onion
      { latitude: 60.277, longitude: 24.84475 }, // Mika Häkkisen aukio
      { latitude: 60.18796, longitude: 24.96067 }, // Vaasanpuistikko
      { latitude: 60.21664, longitude: 24.98362 }, // Vanhankaupunginkoski
    ];

    testValues.forEach(({ latitude, longitude }) => {
      test(`latitude: ${latitude}, longitude: ${longitude}`, () => {
        // Inject Mock in global object so it's accesible in Node environment
        // https://v1.vitest.dev/api/vi#vi-stubglobal
        vi.stubGlobal("navigator", {
          geolocation: {
            getCurrentPosition: setGeolocationMocks(latitude, longitude),
          },
        });

        getUserLocation(setMockLatitude, setMockLongitude);

        expect(setMockLatitude).toHaveBeenCalledOnce();
        expect(setMockLongitude).toHaveBeenCalledOnce();

        expect(setMockLatitude).toHaveBeenCalledWith(latitude);
        expect(setMockLongitude).toHaveBeenCalledWith(longitude);
      });
    });
  });

  describe("unsuccesful callback", () => {
    test("should call onError if geolocation is not supported", () => {
      vi.stubGlobal("navigator", { geolocation: undefined });

      const onErrorMock = vi.fn();
      const setMockLatitude = vi.fn();
      const setMockLongitude = vi.fn();

      getUserLocation(setMockLatitude, setMockLongitude, onErrorMock);

      expect(onErrorMock).toHaveBeenCalledOnce();
      expect(onErrorMock).toHaveBeenCalledWith(
        expect.objectContaining({
          // Assert partial contents of the object
          code: 2,
          message: "Geolocation is not supported by this browser",
        })
      );
    });
    test("should call onError if user denies permission", () => {
      const geolocationPermissionError: GeolocationPositionError = {
        code: 1,
        message: "User denied geolocation permission",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };

      vi.stubGlobal("navigator", {
        geolocation: {
          getCurrentPosition: vi.fn((_successCallback, errorCallback) => {
            errorCallback(geolocationPermissionError); // Simulate user denying permission
          }),
        },
      });

      const onErrorMock = vi.fn();
      getUserLocation(setMockLatitude, setMockLongitude, onErrorMock);

      expect(setMockLatitude).not.toHaveBeenCalled();
      expect(setMockLongitude).not.toHaveBeenCalled();
      expect(onErrorMock).toHaveBeenCalledWith(geolocationPermissionError);
    });
  });
});
