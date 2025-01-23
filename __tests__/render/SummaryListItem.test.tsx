import { cleanup, screen } from "@testing-library/react";
import SummaryListItem, {
  SummaryListItemProps,
} from "../../src/components/SummaryListItem";
import { formatRawValue } from "../../src/utils/library";
import { renderWithTheme } from "./renderTestLibrary";
import { theme } from "../../src/utils/theme";

describe("<SummaryListItem.tsx />", () => {
  describe("formatting meters", () => {
    const testDataValues: SummaryListItemProps = {
      description: "distance list item",
      rawValue: 750,
      formatType: "meter",
    };
    const { description, rawValue } = testDataValues;

    beforeEach(() => {
      renderWithTheme(<SummaryListItem {...testDataValues} />, theme);
    });

    describe("initial render", () => {
      test("should render", async () => {
        const listItem = await screen.findByRole("listitem");
        expect(listItem).toBeVisible();
      });
      test("should render with correct description", async () => {
        const listItem = await screen.findByRole("listitem");
        expect(listItem).toHaveTextContent(description);
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
        expect(valueWrapper).toBeVisible();
        expect(valueWrapper?.textContent).toBe(
          formatRawValue(rawValue, "meter")
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
      test("should render correctly with raw value 0", async () => {
        cleanup();
        const testDataValues: SummaryListItemProps = {
          description: "distance list item",
          rawValue: 0,
          formatType: "meter",
        };
        const { rawValue } = testDataValues;
        renderWithTheme(<SummaryListItem {...testDataValues} />, theme);
        const listItem = await screen.findByRole("listitem");
        const valueWrapper = listItem
          .closest("li")
          ?.querySelector(".MuiListItemSecondaryAction-root span");
        expect(valueWrapper?.textContent).toBe(
          formatRawValue(rawValue, "meter")
        );
        expect(valueWrapper).toHaveAttribute(
          "data-raw-value",
          rawValue.toString()
        );
      });
    });
  });

  describe("formatting currency", () => {
    const testDataValues: SummaryListItemProps = {
      description: "currency list item",
      rawValue: 1000,
      formatType: "euro",
    };
    const { description, rawValue } = testDataValues;

    beforeEach(() => {
      renderWithTheme(<SummaryListItem {...testDataValues} />, theme);
    });

    describe("initial render", () => {
      test("should render", async () => {
        const listItem = await screen.findByRole("listitem");
        expect(listItem).toBeVisible();
      });
      test("should render with correct description", async () => {
        const listItem = await screen.findByRole("listitem");
        expect(listItem).toHaveTextContent(description);
      });
      test("should render with correct value and format", async () => {
        const listItem = await screen.findByRole("listitem");
        const valueWrapper = listItem
          .closest("li")
          ?.querySelector(".MuiListItemSecondaryAction-root span");

        expect(valueWrapper).toBeInTheDocument();
        expect(valueWrapper).toBeVisible();
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
      test("should render correctly with raw value 0", async () => {
        cleanup();
        const testDataValues: SummaryListItemProps = {
          description: "distance list item",
          rawValue: 0,
          formatType: "euro",
        };
        const { rawValue } = testDataValues;
        renderWithTheme(<SummaryListItem {...testDataValues} />, theme);
        const listItem = await screen.findByRole("listitem");
        const valueWrapper = listItem
          .closest("li")
          ?.querySelector(".MuiListItemSecondaryAction-root span");
        expect(valueWrapper?.textContent).toBe(
          formatRawValue(rawValue, "euro")
        );
        expect(valueWrapper).toHaveAttribute(
          "data-raw-value",
          rawValue.toString()
        );
      });
    });
  });
});
