import { fetchVenueData } from "../../src/utils/library";

const mockFetch = vi.fn();

describe("fetchVenueData", () => {
  const testSlug = "test-slug";
  const url = `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues`;
  const testCases: endpointDataType[] = ["static", "dynamic"];

  beforeAll(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  type endpointDataType = "static" | "dynamic";

  describe("succesful call api call", () => {
    testCases.forEach((dataType) => {
      test(`should call the api with datatype='${dataType}' argument and return data`, async () => {
        const mockResponse = { data: "test data" };
        // https://v1.vitest.dev/api/mock.html#mockresolvedvalueonce
        // Mock resolved promise
        mockFetch.mockResolvedValueOnce({
          json: () => Promise.resolve(mockResponse),
        });
        const result = await fetchVenueData(testSlug, dataType);
        expect(mockFetch).toHaveBeenCalledWith(
          `${url}/${testSlug}/${dataType}`
        );
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe("failed api call", () => {
    testCases.forEach((dataType) => {
      test(`should throw error on rejection with datatype='${dataType}'`, async () => {
        await expect(async () => {
          await fetchVenueData(testSlug, dataType);
        }).rejects.toThrowError(`Failed to fetch ${dataType} venue data`);

        expect(mockFetch).toHaveBeenCalledWith(
          `${url}/${testSlug}/${dataType}`
        );
      });
    });
  });
});
