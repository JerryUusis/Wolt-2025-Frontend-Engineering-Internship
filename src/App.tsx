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

function App() {
  const [venueSlug, setVenueSlug] = useState("");
  const [cartValueInCents, setCartValueInCents] = useState(0);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [total, setTotal] = useState<OutputObject>({
    cartValueInCents: 0,
    smallOrderSurcharge: 0,
    deliveryDistance: 0,
    deliveryFee: 0,
    totalPrice: 0,
  });

  const handleCalculateTotal = async (event: React.FormEvent) => {
    event.preventDefault();
    const result = await getTotal(
      venueSlug,
      cartValueInCents,
      userLatitude,
      userLongitude
    );
    setTotal(result);
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
          setNumberState={setCartValueInCents}
          value={cartValueInCents}
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
        <Button
          onClick={() => getUserLocation(setUserLatitude, setUserLongitude)}
        >
          Get location
        </Button>
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
