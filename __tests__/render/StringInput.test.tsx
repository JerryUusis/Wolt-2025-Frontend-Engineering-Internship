import { cleanup, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import StringInput from "../../src/components/StringInput";
import { setCustomQuery, renderWithTheme } from "./renderTestLibrary";
import { theme } from "../../src/utils/theme";

describe("<StringInput />", () => {
  setCustomQuery("data-test-id");
  const setMockState = vi.fn();

  const testDataValues = {
    dataTestId: "test-string-input",
    label: "test label",
    value: "home-assignment-venue-helsinki",
  };
  const { dataTestId, label, value } = testDataValues;

  beforeEach(() => {
    renderWithTheme(
      <StringInput {...testDataValues} setStringState={setMockState} />,
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
    test("should have attribute: data-test-id", () => {
      const inputField = screen.getByTestId(dataTestId);
      expect(inputField).toHaveAttribute("data-test-id", dataTestId);
    });
    test("should have attribute: inputmode=text", () => {
      const inputField = screen.getByTestId(dataTestId);
      expect(inputField).toHaveAttribute("inputmode", "text");
    });
  });

  describe("user interaction", () => {
    test("should call 'setState' with empty string when input is empty", async () => {
      const inputField: HTMLInputElement = screen.getByTestId(dataTestId);
      await userEvent.clear(inputField);

      expect(inputField.value).toBe("");
      expect(setMockState).toHaveBeenCalledOnce();
      expect(setMockState).toHaveBeenCalledWith("");
    });
    test("should set 'setState' to user's desired value", async () => {
      const inputField: HTMLInputElement = screen.getByTestId(dataTestId);
      userEvent.clear(inputField);

      const newValue = "new-test-slug";
      await userEvent.type(inputField, newValue);

      expect(inputField.value).toBe(newValue);
      expect(setMockState).toHaveBeenLastCalledWith(newValue);
    });
    test("should trim empty spaces from the start and end of entered value", async () => {
      const inputField: HTMLInputElement = screen.getByTestId(dataTestId);
      userEvent.clear(inputField);

      const newValue = "  new-test-slug  ";
      await userEvent.type(inputField, newValue);

      expect(inputField.value).toBe(newValue.trim());
      expect(setMockState).toHaveBeenLastCalledWith(newValue.trim());
    });
    test("should have class '.Mui-error' if input is empty", () => {
      const inputField: HTMLInputElement = screen.getByTestId(dataTestId);
      userEvent.clear(inputField);

      // Get the error class from the input field's parent <div> element
      const parentDiv = inputField.parentElement;

      // https://developer.mozilla.org/en-US/docs/Web/API/Element/className
      // https://mui.com/material-ui/api/input/#classes
      // https://vitest.dev/api/expect.html#tomatch
      expect(parentDiv?.className).toMatch(/Mui-error/);
      expect(inputField.value).toBe("");
    });
  });
});
