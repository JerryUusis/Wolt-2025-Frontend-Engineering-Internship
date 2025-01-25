import { Page } from "@playwright/test";
import { InputDataTestId } from "../../src/utils/types";

class TestHelper {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  getInput(testId: InputDataTestId) {
    return this.page.getByTestId(testId);
  }
  getElementWithTestId(testId: string) {
    return this.page.getByTestId(testId);
  }
  getListItem(listLabel: string) {
    return this.page.locator("role=listitem", { hasText: listLabel });
  }
  async fillInput(inputTestId: InputDataTestId, inputValue: string) {
    const input = this.getInput(inputTestId);
    await input.clear();
    await input.fill(inputValue);
  }
  async pressCalculateButton() {
    const calculateButton = this.page.getByRole("button", {
      name: "Calculate delivery fee",
    });
    const staticPromise = this.page.waitForResponse(
      (response) =>
        response.url() ===
          "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/static" &&
        response.status() === 200 &&
        response.request().method() === "GET"
    );

    const dynamicPromise = this.page.waitForResponse(
      (response) =>
        response.url() ===
          "https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/dynamic" &&
        response.status() === 200 &&
        response.request().method() === "GET"
    );

    await calculateButton.click();
    Promise.all([staticPromise, dynamicPromise]);
  }
  async calculateTotal(
    cartValue: string,
    latitude?: string,
    longitude?: string
  ) {
    await this.fillInput("cartValue", cartValue);

    if (latitude && longitude) {
      await this.fillInput("userLatitude", latitude);
      await this.fillInput("userLongitude", longitude);
    } else {
      const locationButton = this.page.getByRole("button", {
        name: "Get location",
      });
      await locationButton.click();
    }

    await this.pressCalculateButton();
  }
}

export default TestHelper;
