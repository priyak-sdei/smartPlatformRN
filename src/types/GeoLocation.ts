import { AnimatedRegion } from 'react-native-maps';

/**
 * Represents a geographic location with latitude and longitude
 */
export interface Location {
  latitude: number;
  longitude: number;
}

/**
 * State for the geolocation hook
 */
export interface GeolocationState {
  currLocation: Location;
  destination: Location | null;
  isLoading: boolean;
  coordinate: AnimatedRegion;
  time: number;
  distance: number;
}
/**
 * Coordinates returned by the Geolocation API
 */
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

/**
 * Position object returned by the Geolocation API
 */
export interface GeoPosition {
  coords: GeoCoordinates;
  timestamp: number;
}

/**
 * Error object returned by the Geolocation API
 */
export interface GeolocationError {
  code: number;
  message: string;
  PERMISSION_DENIED: number;
  POSITION_UNAVAILABLE: number;
  TIMEOUT: number;
}
