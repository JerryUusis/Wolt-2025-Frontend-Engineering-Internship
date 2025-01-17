export interface DistanceRangeObject {
  min: number; //The lower (inclusive) bound for the distance range in meters
  max: number; //The upper (exclusive) bound for the distance range in meters.
  //  "max": 0 means that the delivery is not available for delivery distances equal or longer the value of min in that object.
  a: number; // A constant amount to be added to the delivery fee on top of the base price
  b: number; //  Multiplier to be used for calculating distance based component of the delivery fee.
  // b is factored in to the delivery fee by adding b * distance / 10 (rounded to the nearest integer value).
  flag: null;
}
