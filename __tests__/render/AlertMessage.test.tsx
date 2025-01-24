import { cleanup, screen } from "@testing-library/react";
import { renderWithTheme } from "./renderTestLibrary";
import { setCustomQuery } from "./renderTestLibrary";
import AlertMessage from "../../src/components/AlertMessage";
import { theme } from "../../src/utils/theme";
import userEvent from "@testing-library/user-event";

describe("<AlertMessage />", () => {
  setCustomQuery("data-test-id");

  const mockOnClose = vi.fn();

  let alertMessage: HTMLElement;

  beforeEach(() => {
    vi.clearAllMocks();
    mockOnClose.mockClear();
    renderWithTheme(
      <AlertMessage
        isVisible={true}
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
    test("should not render when isVisible is false", () => {
      cleanup();
      renderWithTheme(
        <AlertMessage
          isVisible={false}
          message="test message"
          onClose={mockOnClose}
        />,
        theme
      );
      expect(alertMessage).not.toBeVisible();
    });
  });

  describe("interaction", () => {
    test("should call onClose after click", async () => {
      expect(alertMessage).toBeVisible();
      expect(alertMessage).toHaveTextContent("test message");

      const closeButton = screen.getByRole("button");
      await userEvent.click(closeButton);
      expect(mockOnClose).toHaveBeenCalledOnce();
    });
  });
});
