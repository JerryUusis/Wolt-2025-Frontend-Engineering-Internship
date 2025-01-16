import TextField from "@mui/material/TextField";
import React, { Dispatch } from "react";

interface NumberInputProps {
  dataTestId: string;
  label: string;
  setNumberState: Dispatch<React.SetStateAction<number>>;
  isFloatValue: boolean;
  decimals?: number;
  value: number;
}

// https://mui.com/material-ui/api/text-field/
const NumberInput = ({
  dataTestId,
  label,
  setNumberState,
  isFloatValue,
  decimals = 2,
  value,
}: NumberInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValueAsNumber: number;
    if (isFloatValue) {
      inputValueAsNumber = handleFloatInput(event.target.value);
    } else {
      inputValueAsNumber = handleIntegerInput(event.target.value);
    }
    setNumberState(inputValueAsNumber);
  };

  const handleFloatInput = (inputValue: string): number => {
    const inputValueString = inputValue.replace(",", ".");

    const fixedFloatString = parseFloat(inputValueString).toFixed(decimals);
    return Number(fixedFloatString);
  };

  const handleIntegerInput = (inputValue: string): number => {
    return Number(inputValue);
  };

  const handleDecimals = (isFloatValue: boolean) => {
    if (isFloatValue) {
      return parseStepsFromDecimals(decimals);
    } else {
      return "1";
    }
  };

  // Set the correct amount of decimals
  const parseStepsFromDecimals = (decimalsAmount: number): string => {
    return (1 / Math.pow(10, decimalsAmount)).toString();
  };

  const numberTypeProps = {
    min: 0,
    step: handleDecimals(isFloatValue),
  };

  return (
    <>
      <TextField
        label={label}
        // https://mui.com/material-ui/migration/migrating-from-deprecated-apis/#textfield
        slotProps={{
          htmlInput: {
            ...numberTypeProps,
            "data-test-id": { dataTestId },
            inputMode: "decimal",
          },
        }}
        type="number"
        onChange={handleChange}
        error={!isNaN(value) ? false : true}
        value={value}
      />
    </>
  );
};

export default NumberInput;
