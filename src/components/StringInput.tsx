import TextField from "@mui/material/TextField";
import React, { Dispatch } from "react";

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
  // Trim whitespaces from input value
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.trim();
    setStringState(inputValue);
  };

  return (
    <>
      <TextField
        label={label}
        slotProps={{
          htmlInput: {
            "data-test-id": { dataTestId },
            inputMode: "text",
          },
        }}
        onChange={handleChange}
        value={value}
      />
    </>
  );
};

export default StringInput;
