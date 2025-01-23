import TextField from "@mui/material/TextField";
import React, { Dispatch, useState, useEffect } from "react";

interface StringInputProps {
  dataTestId: string;
  label: string;
  setStringState: Dispatch<React.SetStateAction<string>>;
  value: string;
}

// https://mui.com/material-ui/migration/migrating-from-deprecated-apis/#textfield
const StringInput = ({
  dataTestId,
  label,
  setStringState,
  value,
}: StringInputProps) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (inputValue === "") {
      setError(true);
    } else {
      setError(false);
    }
  }, [inputValue]);

  // Trim whitespaces from input value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    setInputValue(inputValue);
    setStringState(inputValue);
  };

  return (
    <>
      <TextField
        label={label}
        slotProps={{
          htmlInput: {
            "data-test-id": dataTestId,
            inputMode: "text",
          },
        }}
        onChange={handleChange}
        value={inputValue}
        error={error}
      />
    </>
  );
};

export default StringInput;
