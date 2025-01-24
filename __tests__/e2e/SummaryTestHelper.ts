import { Page } from "@playwright/test";

class SummaryTestHelper {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
  getListItem(listLabel: string) {
    return this.page.locator("role=listitem", { hasText: listLabel });
  }
}

export default SummaryTestHelper;
