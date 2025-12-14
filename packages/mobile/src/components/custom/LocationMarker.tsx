import { Marker } from "react-native-maps";

const LocationMarker = () => {
  const HARDCODED_LATITUDE = 41.48595203395239;
  const HARDCODED_LONGITUDE = -71.42164970467098;

  // Mock the LocationObjectCoords type expected by LocationMap
  const mockCurrentLocationCoords = {
    latitude: HARDCODED_LATITUDE,
    longitude: HARDCODED_LONGITUDE,
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  };

  return <Marker coordinate={mockCurrentLocationCoords} />;
};

export default LocationMarker;
