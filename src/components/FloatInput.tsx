import TextField from "@mui/material/TextField";
import React, { Dispatch, useState, useEffect } from "react";
import { parseStepsFromDecimals } from "../utils/library";

interface FloatInputProps {
  dataTestId: string;
  label: string;
  setNumberState: Dispatch<React.SetStateAction<number>>;
  decimals?: number;
  value: number;
}

// https://mui.com/material-ui/api/text-field/
const FloatInput = ({
  dataTestId,
  label,
  setNumberState,
  decimals = 2,
  value,
}: FloatInputProps) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [error, setError] = useState(false);

  // Monitor input value to determine if there's an error
  useEffect(() => {
    if (inputValue === "") {
      setError(true);
    } else {
      setError(false);
    }
  }, [inputValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    setInputValue(inputString);

    if (inputString === "") {
      setNumberState(0);
      return;
    }

    const inputValueAsNumber = handleFloatInput(inputString, decimals);
    setNumberState(inputValueAsNumber);
  };

  const handleFloatInput = (inputValue: string, decimals: number): number => {
    return Number(inputValue) * Math.pow(10, decimals);
  };

  const numberTypeProps = {
    min: 0,
    step: parseStepsFromDecimals(decimals),
    "data-test-id": dataTestId,
    inputMode: "decimal",
  };

  return (
    <>
      <TextField
        label={label}
        // https://mui.com/material-ui/migration/migrating-from-deprecated-apis/#textfield
        slotProps={{
          htmlInput: {
            ...numberTypeProps,
          },
        }}
        type="number"
        onChange={handleChange}
        error={error}
        value={inputValue}
      />
    </>
  );
};

export default FloatInput;
