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
}

export default TestHelper;
