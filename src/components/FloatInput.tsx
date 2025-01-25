import TextField from "@mui/material/TextField";
import React, { Dispatch, useState } from "react";
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    setInputValue(inputString);

    if (inputString === "") {
      setNumberState(NaN);
      setError(true);
      return;
    }

    const inputValueAsNumber = handleFloatInput(inputString, decimals);
    if (inputValueAsNumber < 0) {
      setError(true);
    } else {
      setError(false);
    }
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
    <TextField
      sx={{ width: "250px" }}
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
      helperText={error ? "Must be a valid number" : " "}
      value={inputValue}
    />
  );
};

export default FloatInput;
