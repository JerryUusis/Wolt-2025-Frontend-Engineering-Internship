import React, { SetStateAction } from "react";

export const getUserLocation = (
  setUserLatitude: React.Dispatch<SetStateAction<number>>,
  setUserLongitude: React.Dispatch<SetStateAction<number>>
) => {
  navigator.geolocation.getCurrentPosition((position) => {
    setUserLatitude(parseFloat(position.coords.latitude.toFixed(5)));
    setUserLongitude(parseFloat(position.coords.longitude.toFixed(5)));
  });
};

// https://mapsplatform.google.com/resources/blog/how-calculate-distances-map-maps-javascript-api/
// Return straight line distance in meters
export const haversineDistance = (
  userLatitude: number,
  venueLatitude: number,
  userLongitude: number,
  venueLongitude: number
) => {
  const radius = 6371.071; // Radius of the Earth in km
  const rlat1 = userLatitude * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = venueLatitude * (Math.PI / 180);

  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (venueLongitude - userLongitude) * (Math.PI / 180); // Radian difference (longitudes)

  const distance =
    2 *
    radius *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );
  return Math.round(distance * 1000);
};

export const getSurcharge = (cartValueInCents: number, maxValue: number) => {
  if (cartValueInCents >= maxValue) {
    return 0;
  } else {
    return maxValue - cartValueInCents;
  }
};

// Set the correct amount of decimals in the steps attribute
// decimals = 1 => "0.1"
// decimals = 2 => "0.01"
// decimals = 3 => "0.001"
export const parseStepsFromDecimals = (decimalsAmount: number): string => {
  return (1 / Math.pow(10, decimalsAmount)).toString();
};
