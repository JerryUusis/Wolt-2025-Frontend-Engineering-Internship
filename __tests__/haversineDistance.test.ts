import { haversineDistance } from "../src/utils/library";
import { testCoordinateValuesArray } from "./testUtils";

describe("haversineDistance", () => {
  const [user, venue] = testCoordinateValuesArray;
  describe("should return straight line dustance", () => {
    test("from Wolt HQ & Vaasanpuistikko", () => {
      const result = haversineDistance(
        user.latitude,
        venue.latitude,
        user.longitude,
        venue.longitude
      );
      expect(result).toBe(2509);
    });
    test("values are 0", () => {
      expect(haversineDistance(0, 0, 0, 0)).toBe(0);
    });
    // https://gis.stackexchange.com/questions/71960/what-is-the-precise-distance-from-equator-to-pole-according-to-wgs84
    test("distance from north pole to equator", () => {
      const userLatitude = 90.0; // North Pole
      const userLongitude = 0.0;
      const venueLatitude = 0.0; // Equator
      const venueLongitude = 0.0;

      expect(
        haversineDistance(
          userLatitude,
          venueLatitude,
          userLongitude,
          venueLongitude
        )
      ).toBe(10007655); // Roughly 10 007.6km
    });
  });
  describe("should throw error when", () => {
    test("latitudes are NaN", () => {
      expect(() => {
        haversineDistance(NaN, NaN, user.longitude, venue.longitude);
      }).toThrowError("latitude must be a valid number");
    });
    test("longitudes are NaN", () => {
      expect(() => {
        haversineDistance(user.latitude, venue.latitude, NaN, NaN);
      }).toThrowError("longitude must be a valid number");
    });
    test("all arguments NaN", () => {
      expect(() => {
        haversineDistance(NaN, NaN, NaN, NaN);
      }).toThrowError("latitude must be a valid number");
    });
    test("latitude is more than 90", () => {
      expect(() => {
        haversineDistance(91, 92, user.longitude, venue.longitude);
      }).toThrowError("latitude must be between -90 and 90");
    });
    test("latitude is less than -90", () => {
      expect(() => {
        haversineDistance(-91, -92, user.longitude, venue.longitude);
      }).toThrowError("latitude must be between -90 and 90");
    });
    test("longitude is more than 180", () => {
      expect(() => {
        haversineDistance(user.latitude, venue.latitude, 180, 181);
      }).toThrowError("longitude must be between -180 and 180");
    });
    test("longitude is less than 180", () => {
      expect(() => {
        haversineDistance(user.latitude, venue.latitude, -180, -181);
      }).toThrowError("longitude must be between -180 and 180");
    });
  });
});
