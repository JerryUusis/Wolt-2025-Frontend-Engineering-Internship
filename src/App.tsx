import { SetStateAction, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import NumberInput from "./components/NumberInput";
import StringInput from "./components/StringInput";

import { getUserLocation, haversineDistance } from "./utils/library";

function App() {
  const [venueSlug, setVenueSlug] = useState("");
  const [cartValue, setCartValue] = useState(0);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  const [staticVenueData, setStaticVenueData] = useState();
  const [dynamicVenueData, setDynamicVenueData] = useState();

  useEffect(() => {
    const fetchVenueData = async (
      venueSlug: string,
      endpointType: "static" | "dynamic",
      setState: React.Dispatch<SetStateAction>
    ) => {
      const url = `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}`;
      const response = await fetch(`${url}/${endpointType}`);
      const data = await response.json();
      setState(data);
    };

    const fetchDynamicAndStaticVenueData = async () => {
      await fetchVenueData(
        "home-assignment-venue-helsinki",
        "static",
        setStaticVenueData
      );
      await fetchVenueData(
        "home-assignment-venue-helsinki",
        "dynamic",
        setDynamicVenueData
      );
    };

    fetchDynamicAndStaticVenueData();
  }, []);

  const calculateTotal = () => {
    // Venue location data
    const [venueLongitude, venueLatitude] =
      staticVenueData.venue_raw.location.coordinates;

    // Calculate straight line distance between user and venue
    const distance = haversineDistance(
      userLatitude,
      venueLatitude,
      userLongitude,
      venueLongitude
    );

    const total = {
      cartValue,
      smallOrderSurcharge: 0,
      deliveryDistance: distance,
      deiveryFee: 190,
      totalPrice: 1190,
    };
    return total;
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
        <NumberInput
          label="Cart value"
          dataTestId={"cartValue"}
          setNumberState={setCartValue}
          isFloatValue={true}
          value={cartValue}
        />
        <NumberInput
          label="User latitude"
          dataTestId={"userLatitude"}
          setNumberState={setUserLatitude}
          isFloatValue={true}
          value={userLatitude}
          decimals={5}
        />
        <NumberInput
          label="User longitude"
          dataTestId={"userLongitude"}
          setNumberState={setUserLongitude}
          isFloatValue={true}
          value={userLongitude}
          decimals={5}
        />
        <Button
          onClick={() => getUserLocation(setUserLatitude, setUserLongitude)}
        >
          Get location
        </Button>
        <Button onClick={() => calculateTotal()}>Calculate delivery fee</Button>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h2">Price Breakdown</Typography>
          <List>
            <ListItem secondaryAction={<span>0e</span>}>Cart value</ListItem>
            <ListItem secondaryAction={<span>0e</span>}>Delivery fee</ListItem>
            <ListItem secondaryAction={<span>0e</span>}>
              Delivery distance
            </ListItem>
            <ListItem secondaryAction={<span>0e</span>}>
              Small order surcharge
            </ListItem>
            <ListItem secondaryAction={<span>0e</span>}>Cart value</ListItem>
            <Divider />
            <ListItem secondaryAction={<span>0e</span>}>Total price</ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
