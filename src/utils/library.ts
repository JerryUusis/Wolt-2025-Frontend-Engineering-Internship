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
