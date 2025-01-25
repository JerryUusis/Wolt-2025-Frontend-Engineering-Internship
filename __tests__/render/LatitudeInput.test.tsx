import { cleanup, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import CoordinateInput, {
  CoordinateInputProps,
} from "../../src/components/CoordinateInput";
import { setCustomQuery, renderWithTheme } from "./renderTestLibrary";
import { theme } from "../../src/utils/theme";

describe("<CoordinateInput />", () => {
  setCustomQuery("data-test-id");
  const setMockState = vi.fn();

  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  describe("latitude input", () => {
    const testLatitudeDataValues: CoordinateInputProps = {
      dataTestId: "latitudeInput",
      label: "test label",
      value: 20.12345,
      coordinateType: "latitude",
      setNumberState: setMockState,
    };

    const { dataTestId, label, value } = testLatitudeDataValues;

    describe("initial render", () => {
      beforeEach(() => {
        renderWithTheme(
          <CoordinateInput
            {...testLatitudeDataValues}
            setNumberState={setMockState}
          />,
          theme
        );
      });
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
      test("should have default attribute step=0.00001", () => {
        const inputField = screen.getByTestId(dataTestId);
        expect(inputField).toHaveAttribute("step", "0.00001");
      });
      test("should have attribute: data-test-id", () => {
        const inputField = screen.getByTestId(dataTestId);
        expect(inputField).toHaveAttribute("data-test-id", dataTestId);
      });
      test("should have attribute: inputmode=decimal", () => {
        const inputField = screen.getByTestId(dataTestId);
        expect(inputField).toHaveAttribute("inputmode", "decimal");
      });
      test("should have attribute: min=-90", () => {
        const inputField = screen.getByTestId(dataTestId);
        expect(inputField).toHaveAttribute("min", "-90");
      });
      test("should have attribute: max=90", () => {
        const inputField = screen.getByTestId(dataTestId);
        expect(inputField).toHaveAttribute("max", "90");
      });

      describe("user interaction", () => {
        test("should call 'setState' with zero NaN when input is empty", () => {
          const inputField: HTMLInputElement = screen.getByTestId(dataTestId);
          userEvent.clear(inputField);

          expect(inputField.value).toBe("");
          expect(setMockState).toHaveBeenCalledOnce();
          expect(setMockState).toHaveBeenCalledWith(NaN);
        });
        test("should set 'setState' to user's desired value", async () => {
          const inputField: HTMLInputElement = screen.getByTestId(dataTestId);
          userEvent.clear(inputField);

          const newValue = "20.54321";
          await userEvent.type(inputField, newValue);

          expect(inputField.value).toBe(newValue);
          expect(setMockState).toHaveBeenLastCalledWith(Number(newValue));
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
  });
});
