import React, { SetStateAction } from "react";
import { DistanceRangeObject } from "./types";

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

export const fetchVenueData = async (
  venueSlug: string,
  endpointType: "static" | "dynamic"
) => {
  const url = `https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/${venueSlug}`;
  const response = await fetch(`${url}/${endpointType}`);
  return await response.json();
};

export const getTotal = async (
  venueSlug: string,
  cartValueInCents: number,
  userLatitude: number,
  userLongitude: number
) => {
  try {
    const staticVenueData = await fetchVenueData(venueSlug, "static");
    const dynamicVenueData = await fetchVenueData(venueSlug, "dynamic");

    const [venueLongitude, venueLatitude] =
      staticVenueData.venue_raw.location.coordinates;

    const distanceRanges =
      dynamicVenueData.venue_raw.delivery_specs.delivery_pricing
        .distance_ranges;

    // Calculate straight line distance between user and venue
    const deliveryDistance = haversineDistance(
      userLatitude,
      venueLatitude,
      userLongitude,
      venueLongitude
    );

    const noSurchargeThreshold =
      dynamicVenueData.venue_raw.delivery_specs.order_minimum_no_surcharge;

    const smallOrderSurcharge = getSurcharge(
      cartValueInCents,
      noSurchargeThreshold
    );

    const basePrice =
      dynamicVenueData.venue_raw.delivery_specs.delivery_pricing.base_price;

    const getDistancePrice = (
      straightLineDistance: number,
      distanceRangesArray: DistanceRangeObject[],
      basePrice: number
    ) => {
      for (const distanceRangeObject of distanceRangesArray) {
        const { min, max, a, b } = distanceRangeObject;
        if (straightLineDistance > min && straightLineDistance < max) {
          return basePrice + a + (b * straightLineDistance) / 10;
        } else {
          throw new Error("User too far from venue");
        }
      }
    };

    const deliveryFee = getDistancePrice(
      deliveryDistance,
      distanceRanges,
      basePrice
    );

    if (deliveryFee) {
      const total = {
        cartValueInCents,
        smallOrderSurcharge,
        deliveryDistance,
        deliveryFee,
        totalPrice: cartValueInCents + smallOrderSurcharge + deliveryFee,
      };
      console.log(total)
      return total;
    }
  } catch (error) {
    console.log(error);
  }
};
