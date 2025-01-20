import { cleanup, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CoordinateInput from "../src/components/CoordinateInput";
import { setCustomQuery, renderWithTheme } from "./renderTestLibrary";
import { theme } from "../src/utils/theme";

describe("<CoordinateInput />", () => {
  setCustomQuery("data-test-id");
  const setMockState = vi.fn();

  const testDataValues = {
    dataTestId: "test-coordinates",
    label: "test label",
    value: 20.12345,
  };
  const { dataTestId, label, value } = testDataValues;

  beforeEach(() => {
    renderWithTheme(
      <CoordinateInput {...testDataValues} setNumberState={setMockState} />,
      theme
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  describe("initial render", () => {
    test("should render", () => {
      const inputField = screen.getByTestId(dataTestId);
      expect(inputField).toBeVisible();
    });
    test("should have right default value", () => {
      const inputField = screen.getByTestId(dataTestId);
      expect(inputField).toHaveValue(value);
    });
    test("should have right label text", async () => {
      const inputLabel = await screen.findByLabelText(label);
      expect(inputLabel).toBeVisible();
    });
  });
  describe("user interaction", () => {
    test("should call 'setState' with zero (0) when input is empty", () => {
      const inputField: HTMLInputElement = screen.getByTestId(dataTestId);
      userEvent.clear(inputField);

      expect(inputField.value).toBe("");
      expect(setMockState).toHaveBeenCalledOnce();
      expect(setMockState).toHaveBeenCalledWith(0);
    });
    test("should set 'setState' to user's desired value", async () => {
      const inputField: HTMLInputElement = screen.getByTestId(dataTestId);
      userEvent.clear(inputField);

      const newValue = "20.54321";
      await userEvent.type(inputField, newValue);

      expect(inputField.value).toBe(newValue);
      expect(setMockState).toHaveBeenLastCalledWith(Number(newValue));
    });
  });
});
