import TextField from "@mui/material/TextField";
import React, { Dispatch } from "react";

interface NumberInputProps {
  dataTestId: string;
  label: string;
  setNumberState: Dispatch<React.SetStateAction<number>>;
  isFloatValue: boolean;
  value: number;
}

// https://mui.com/material-ui/migration/migrating-from-deprecated-apis/#textfield
const NumberInput = ({
  dataTestId,
  label,
  setNumberState,
  isFloatValue,
  value,
}: NumberInputProps) => {
  const numberTypeProps = {
    min: 0,
    step: isFloatValue ? "0.01" : "1",
  };

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
    const fixedFloatString = parseFloat(inputValueString).toFixed(2);
    return Number(fixedFloatString);
  };

  const handleIntegerInput = (inputValue: string): number => {
    return Number(inputValue);
  };

  return (
    <>
      <TextField
        label={label}
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
      />
    </>
  );
};

export default NumberInput;
