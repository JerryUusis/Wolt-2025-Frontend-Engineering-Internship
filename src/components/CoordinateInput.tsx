import TextField from "@mui/material/TextField";
import React, { Dispatch, useState } from "react";
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    setInputValue(inputString);

    if (inputString === "") {
      return setNumberState(0);
    }

    const inputValueAsNumber = Number(inputString);
    setNumberState(inputValueAsNumber);
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
        error={inputValue === "" ? true : false}
        value={inputValue === "" ? "" : value}
      />
    </>
  );
};

export default CoordinateInput;
