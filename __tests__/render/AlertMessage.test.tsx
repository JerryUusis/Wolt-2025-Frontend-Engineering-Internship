import { screen, render } from "@testing-library/react";
import { renderWithTheme } from "./renderTestLibrary";
import { setCustomQuery } from "./renderTestLibrary";
import AlertMessage from "../../src/components/AlertMessage";
import { theme } from "../../src/utils/theme";
import userEvent from "@testing-library/user-event";

describe("<AlertMessage />", () => {
  setCustomQuery("data-test-id");
  let isVisible: boolean; // mimic the state

  const mockOnClose = vi.fn(() => {
    isVisible = false;
  });

  let alertMessage: HTMLElement;

  beforeEach(() => {
    vi.clearAllMocks();
    isVisible = true;
    mockOnClose.mockClear();
    renderWithTheme(
      <AlertMessage
        isVisible={isVisible}
        message="test message"
        onClose={mockOnClose}
      />,
      theme
    );
    alertMessage = screen.getByTestId("alertMessage");
  });

  describe("initial render", () => {
    test("should render", () => {
      expect(alertMessage).toBeVisible();
    });
    test("should have the right message", async () => {
      expect(alertMessage).toHaveTextContent("test message");
    });
  });

  describe("interaction", () => {
    test("should call onClose after click", async () => {
      alertMessage = screen.getByTestId("alertMessage");
      expect(alertMessage).toBeVisible();
      expect(alertMessage).toHaveTextContent("test message");

      const closeButton = screen.getByRole("button");
      await userEvent.click(closeButton);

      // Check that the alert is not visible anymore
      expect(mockOnClose).toHaveBeenCalledOnce();
    });
  });
});
