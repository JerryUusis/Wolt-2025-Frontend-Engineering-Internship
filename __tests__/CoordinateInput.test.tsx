import { cleanup, screen } from "@testing-library/react";
import CoordinateInput from "../src/components/CoordinateInput";
import { setCustomQuery, renderWithTheme } from "./renderTestLibrary";
import { theme } from "../src/utils/theme";

describe("<CoordinateInput />", () => {
  setCustomQuery("data-test-id");
  const setMockState = vi.fn(() => 0);

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

  test("should render", () => {
    const coordinateInput = screen.getByTestId(dataTestId);
    expect(coordinateInput).toBeVisible();
  });
  test("should have right default value", () => {
    const coordinateInput = screen.getByTestId(dataTestId);
    expect(coordinateInput).toHaveValue(value);
  });
  test("should have right label text", async () => {
    const inputLabel = await screen.findByLabelText(label);
    expect(inputLabel).toBeVisible();
  });
  test("should have the right setNumberState value", () => {
    
  });
});
