import { cleanup, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SummaryListItem, {
  SummaryListItemProps,
} from "../src/components/SummaryListItem";
import { formatRawValue } from "../src/utils/library";
import { renderWithTheme } from "./renderTestLibrary";
import { theme } from "../src/utils/theme";

describe("<SummaryListItem.tsx />", () => {
  describe("formatting currency", () => {
    const testDataValues: SummaryListItemProps = {
      description: "currency list item",
      rawValue: 1000,
      formatType: "euro",
    };
    const { description, rawValue, formatType } = testDataValues;
    beforeEach(() => {
      renderWithTheme(<SummaryListItem {...testDataValues} />, theme);
    });

    describe("initial render", () => {
      test("should render with correct description", async () => {
        const listItem = await screen.findByRole("listitem");
        expect(listItem).toBeVisible();
      });
      test("should render with correct value and format", async () => {
        const listItem = await screen.findByRole("listitem");
        // https://mui.com/material-ui/api/list-item/#props
        // https://mui.com/material-ui/api/list-item/#classes
        // Locate the <span> value wrapper inside secondaryAction prop
        const valueWrapper = listItem
          .closest("li")
          ?.querySelector(".MuiListItemSecondaryAction-root span");

        expect(valueWrapper).toBeInTheDocument();
        expect(valueWrapper?.textContent).toBe(
          formatRawValue(rawValue, "euro")
        );
      });
      test("should render with correct attributes", async () => {
        const listItem = await screen.findByRole("listitem");
        const valueWrapper = listItem
          .closest("li")
          ?.querySelector(".MuiListItemSecondaryAction-root span");

        expect(valueWrapper).toHaveAttribute(
          "data-raw-value",
          rawValue.toString()
        );
      });
    });
  });
  afterEach(() => {
    cleanup();
  });
});
