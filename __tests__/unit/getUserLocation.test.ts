import { getUserLocation } from "../../src/utils/library";
import { setGeolocationMocks } from "./testUtils";
import { testCoordinateValuesArray } from "./testUtils";

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
    testCoordinateValuesArray.forEach(({ latitude, longitude }) => {
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
