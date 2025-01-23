import React, { useState } from "react";
import { getTotal, getUserLocation } from "./utils/library";
import { OutputObject } from "./utils/types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FloatInput from "./components/FloatInput";
import CoordinateInput from "./components/CoordinateInput";
import StringInput from "./components/StringInput";
import Summary from "./components/Summary";
import AlertMessage from "./components/AlertMessage";

function App() {
  const [venueSlug, setVenueSlug] = useState("home-assignment-venue-helsinki");
  const [cartValue, setCartValue] = useState(0); // Cart value in cents
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [total, setTotal] = useState<OutputObject>({
    cartValue: 0,
    smallOrderSurcharge: 0,
    deliveryDistance: 0,
    deliveryFee: 0,
    totalPrice: 0,
  });

  const handleCloseAlert = () => {
    setIsAlertVisible(false);
  };

  const handleCalculateTotal = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const result = (await getTotal({
        venueSlug,
        cartValue,
        userLatitude,
        userLongitude,
      })) as OutputObject;
      setTotal(result);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setIsAlertVisible(true);
      }
      setTotal({
        cartValue: 0,
        smallOrderSurcharge: 0,
        deliveryDistance: 0,
        deliveryFee: 0,
        totalPrice: 0,
      });
    }
  };

  const handleGetLocation = () => {
    try {
      getUserLocation(setUserLatitude, setUserLongitude, (error) => {
        setErrorMessage(error.message);
        setIsAlertVisible(true);
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setIsAlertVisible(true);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
      component={"form"}
      onSubmit={handleCalculateTotal}
    >
      <AlertMessage
        isVisible={isAlertVisible}
        message={errorMessage}
        onClose={handleCloseAlert}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Typography variant="h1">Delivery Order Price Calculator</Typography>
        <StringInput
          label="Venue slug"
          dataTestId="venueSlug"
          setStringState={setVenueSlug}
          value={venueSlug}
        />
        <FloatInput
          label="Cart value (€)"
          dataTestId={"cartValue"}
          setNumberState={setCartValue}
          value={cartValue}
        />
        <CoordinateInput
          label="User latitude"
          dataTestId={"userLatitude"}
          setNumberState={setUserLatitude}
          value={userLatitude}
        />
        <CoordinateInput
          label="User longitude"
          dataTestId={"userLongitude"}
          setNumberState={setUserLongitude}
          value={userLongitude}
        />
        <Button onClick={handleGetLocation}>Get location</Button>
        <Button type="submit">Calculate delivery fee</Button>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h2">Price Breakdown</Typography>
          <Summary {...total} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
