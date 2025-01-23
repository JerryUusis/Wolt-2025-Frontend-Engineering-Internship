import TextField from "@mui/material/TextField";
import React, { Dispatch, useState, useEffect } from "react";
import { parseStepsFromDecimals } from "../utils/library";

interface CoordinateInputProps {
  dataTestId: string;
  label: string;
  setNumberState: Dispatch<React.SetStateAction<number>>;
  decimals?: number;
  value: number;
}

// https://mui.com/material-ui/api/text-field/
const CoordinateInput = ({
  dataTestId,
  label,
  setNumberState,
  decimals = 5,
  value,
}: CoordinateInputProps) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  // Monitor for state changes if user clicks "Get location" button
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    setInputValue(inputString);

    if (inputString === "") {
      setNumberState(0);
      return;
    }

    const inputValueAsNumber = Number(inputString);
    if (!isNaN(inputValueAsNumber)) {
      setNumberState(inputValueAsNumber);
    }
  };

  const numberInputTypeProps = {
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
            ...numberInputTypeProps,
          },
        }}
        type="number"
        onChange={handleChange}
        error={inputValue === ""}
        value={inputValue}
      />
    </>
  );
};

export default CoordinateInput;
