import { getTotal } from "../src/utils/library";
import staticData from "./staticVenueData.json";
import dynamicData from "./dynamicVenueData.json";
import { OutputObject, TotalInputObject } from "../src/utils/types";

const mockFetch = vi.fn();

const inputObject: TotalInputObject = {
  venueSlug: "home-assignment-venue-helsinki",
  cartValue: 1000,
  userLatitude: 60.17094,
  userLongitude: 24.93087,
};

const setMockFetch = () => {
  mockFetch
    .mockResolvedValueOnce({
      json: async () => staticData,
    })
    .mockResolvedValueOnce({
      json: async () => dynamicData,
    });
};

describe("getTotal()", () => {
  beforeAll(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  beforeEach(() => {
    setMockFetch();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  describe("should calculate total", () => {
    const venueSlug = "home-assignment-venue-helsinki";
    const url = `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}`;
    test("with make the right api calls", async () => {
      setMockFetch();
      await getTotal(inputObject);
      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(mockFetch).toHaveBeenNthCalledWith(1, `${url}/static`);
      expect(mockFetch).toHaveBeenNthCalledWith(2, `${url}/dynamic`);
    });
    test("return value should have right keys", async () => {
      setMockFetch();
      const result = await getTotal(inputObject);
      expect(result).toMatchObject({
        cartValue: expect.any(Number),
        smallOrderSurcharge: expect.any(Number),
        deliveryDistance: expect.any(Number),
        deliveryFee: expect.any(Number),
        totalPrice: expect.any(Number),
      });
    });
    test("should have the expected output", async () => {
      const result = (await getTotal(inputObject)) as OutputObject;
      expect(result).toEqual({
        cartValue: 1000,
        smallOrderSurcharge: 0,
        deliveryDistance: 177,
        deliveryFee: 190,
        totalPrice:
          result.cartValue + result.deliveryFee + result.smallOrderSurcharge,
      });
    });
  });
});
