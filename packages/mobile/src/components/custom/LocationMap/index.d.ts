// components/custom/LocationMap/index.d.ts

// You need to define or import the GeofencingState type here for clarity.
// Assuming GeofencingState is already available in your project's types:

import type { ComponentType } from "react";
import type { GeofencingState } from "@/hooks/useGeofencing"; // Adjust path as needed

// Define the exact props LocationMap accepts
export type LocationMapProps = {
  geofencingState: GeofencingState;
  // If you later add initialCenterCoords, add it here too:
  // initialCenterCoords: { latitude: number; longitude: number; };
};

// Update the ComponentType to use the defined props
declare const LocationMap: ComponentType<LocationMapProps>;
export default LocationMap;
