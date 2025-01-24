import TextField from "@mui/material/TextField";
import React, { Dispatch, useState, useEffect } from "react";
import { parseStepsFromDecimals } from "../utils/library";
import { CoordinateType } from "../utils/types";

interface CoordinateInputProps {
  dataTestId: string;
  label: string;
  setNumberState: Dispatch<React.SetStateAction<number>>;
  decimals?: number;
  value: number;
  coordinateType: CoordinateType;
}

// https://mui.com/material-ui/api/text-field/
const CoordinateInput = ({
  dataTestId,
  label,
  setNumberState,
  decimals = 5,
  value,
  coordinateType,
}: CoordinateInputProps) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());
  const [error, setError] = useState(false);
  const [min, setMin] = useState<number>();
  const [max, setMax] = useState<number>();

  // Set range dependig on the coordinate type
  useEffect(() => {
    const { min, max } = setValueRange(coordinateType);
    setMin(min);
    setMax(max);
  }, []);

  // Monitor for state changes if user clicks "Get location" button
  useEffect(() => {
    setInputValue(isNaN(value) ? "" : value.toString());
    setError(isNaN(value));
  }, [value]);

  const setValueRange = (coordinateType: CoordinateType) => {
    return coordinateType === "latitude"
      ? { min: -90, max: 90 }
      : { min: -180, max: 180 };
  };

  const isValidCoordinateRange = (coordinateValue: number) => {
    return coordinateValue >= min && coordinateValue <= max;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    setInputValue(inputString);

    if (inputString === "") {
      setError(true);
      setNumberState(NaN);
      return;
    } else {
      setError(false);
    }

    const inputValueAsNumber = Number(inputString);
    if (!isValidCoordinateRange(inputValueAsNumber)) {
      setError(true);
    }

    if (!isNaN(inputValueAsNumber)) {
      setNumberState(inputValueAsNumber);
      setError(false);
    }
  };

  const numberInputTypeProps = {
    min,
    max,
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
          ...numberInputTypeProps,
        },
      }}
      type="number"
      onChange={handleChange}
      error={error}
      helperText={
        error
          ? `${
              coordinateType.charAt(0).toUpperCase() + coordinateType.slice(1) // Capitalize first letter
            } must be between  ${min} and ${max}`
          : " "
      }
      value={inputValue}
    />
  );
};

export default CoordinateInput;
