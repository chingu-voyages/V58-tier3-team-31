import type Location from "expo-location";

export type LocationSubscription = Location.LocationSubscription | null;
export type LocationCoords = { latitude: number; longitude: number } | null;
