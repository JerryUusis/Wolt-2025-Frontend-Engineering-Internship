import { cleanup, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import FloatInput from "../src/components/FloatInput";
import { setCustomQuery, renderWithTheme } from "./renderTestLibrary";
import { theme } from "../src/utils/theme";

describe("<FloatInput />", () => {
  setCustomQuery("data-test-id");
  const setMockState = vi.fn();

  const testDataValues = {
    dataTestId: "test-float-input",
    label: "test label",
    value: 10.5,
  };
  const { dataTestId, label, value } = testDataValues;

  beforeEach(() => {
    renderWithTheme(
      <FloatInput {...testDataValues} setNumberState={setMockState} />,
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
    test("should have default attribute step=0.01", () => {
      const inputField = screen.getByTestId(dataTestId);
      expect(inputField).toHaveAttribute("step", "0.01");
    });
    test("should have attribute: data-test-id", () => {
      const inputField = screen.getByTestId(dataTestId);
      expect(inputField).toHaveAttribute("data-test-id", dataTestId);
    });
    test("should have attribute: inputmode=decimal", () => {
      const inputField = screen.getByTestId(dataTestId);
      expect(inputField).toHaveAttribute("inputmode", "decimal");
    });
    test("should have attribute: min=0", () => {
      const inputField = screen.getByTestId(dataTestId);
      expect(inputField).toHaveAttribute("min", "0");
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

      const newValue = "13.50";
      await userEvent.type(inputField, newValue);

      expect(Number(inputField.value)).toBe(Number(newValue));
      // Default value for decimals is 2
      // Use Number(inputValue) * Math.pow(10, decimals) to parse the value to integer (cents in this case)
      expect(setMockState).toHaveBeenLastCalledWith(Number(newValue) * 100);
    });
    test("should have class '.Mui-error' if input is empty", () => {
      const inputField: HTMLInputElement = screen.getByTestId(dataTestId);
      userEvent.clear(inputField);

      // Get the error class from the input field's parent <div> element
      const parentDiv = inputField.parentElement;

      // https://developer.mozilla.org/en-US/docs/Web/API/Element/className
      // https://mui.com/material-ui/api/input/#classes
      expect(parentDiv?.className).toMatch(/Mui-error/);
      expect(inputField.value).toBe("");
    });
    test("should have class '.Mui-error' if input's final character is a dot '.'", () => {
      const inputField: HTMLInputElement = screen.getByTestId(dataTestId);
      userEvent.clear(inputField);

      const newValue = "13.";

      userEvent.type(inputField, newValue);

      // Get the error class from the input field's parent <div> element
      const parentDiv = inputField.parentElement;

      // https://developer.mozilla.org/en-US/docs/Web/API/Element/className
      // https://mui.com/material-ui/api/input/#classes
      expect(parentDiv?.className).toMatch(/Mui-error/);
      expect(inputField.value).toBe("");
    });
  });
});
