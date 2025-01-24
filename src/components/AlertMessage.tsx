import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface AlertMessageProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

// https://mui.com/material-ui/react-alert/#api

const AlertMessage = ({ message, isVisible, onClose }: AlertMessageProps) => {
  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      data-test-id="alertMessage"
    >
      <Alert
        variant="filled"
        severity="error"
        onClose={onClose}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
