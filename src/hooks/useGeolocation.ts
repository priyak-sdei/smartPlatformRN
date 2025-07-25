import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '@src/helpers/permission';
import {
  GeoPosition,
  GeolocationError,
  GeolocationState,
  Location,
} from '@src/types/GeoLocation';
import { useRef, useState } from 'react';
import { AnimatedRegion } from 'react-native-maps';

export const useGeolocation = () => {
  const initialLocation: Location = {
    latitude: 0,
    longitude: 0,
  };

  const [state, setState] = useState<GeolocationState>({
    currLocation: initialLocation,
    destination: null,
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: initialLocation.latitude,
      longitude: initialLocation.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }),
    time: 0,
    distance: 0,
  });

  const { currLocation, destination, coordinate, time, distance } = state;

  const updateState = (data: Partial<GeolocationState>) =>
    setState(prev => ({ ...prev, ...data }));

  /**
   * Updates the loading state
   * @param isLoading - The loading state to set
   */
  const setLoading = (isLoading: boolean) => {
    updateState({ isLoading });
  };

  /**
   * Gets the current location of the device
   * @returns Promise<void>
   */
  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      const granted = await requestLocationPermission();
      if (!granted) {
        console.warn('Location permission not granted');
        return;
      }
      Geolocation.getCurrentPosition(
        (position: GeoPosition) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { latitude, longitude };
          updateState({ currLocation: newLocation });
          console.log('newLocation', newLocation);
        },
        (error: GeolocationError) => {
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    } catch (error) {
      console.error('Error getting current location:', error);
    } finally {
      setLoading(false);
    }
  };

  const watchIdRef = useRef<number | null>(null);

  /**
   * Starts watching the device's position
   */
  const startWatchPosition = () => {
    try {
      const watchId = Geolocation.watchPosition(
        (position: GeoPosition) => {
          const { latitude, longitude } = position.coords;
          const newCoordinate = { latitude, longitude };

          updateState({ currLocation: newCoordinate });

          // Animate the coordinate change
          // coordinate
          //   .timing({
          //     toValue: coordinate.create({
          //       latitude: newCoordinate.latitude,
          //       longitude: newCoordinate.longitude,
          //       latitudeDelta: 0.01,
          //       longitudeDelta: 0.01,
          //     }),
          //     useNativeDriver: false,
          //     latitude: 0.01,
          //     longitude: 0.01,
          //     latitudeDelta: 0.01,
          //     longitudeDelta: 0.01,
          //   })
          //   .start();
        },
        (error: GeolocationError) => {
          console.error('Watch position error:', error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          interval: 5000,
          fastestInterval: 2000,
        },
      );

      watchIdRef.current = watchId;
    } catch (error) {
      console.error('Error starting watch position:', error);
    }
  };

  const stopWatchPosition = () => {
    if (watchIdRef.current !== null) {
      Geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  /**
   * Updates the distance and time values
   * @param distance - The distance value to set
   * @param time - The time value to set
   */
  const fetchTime = () => {
    updateState({
      distance,
      time,
    });
  };

  /**
   * Sets the destination location
   * @param location - The destination location to set
   */
  const setDestination = (location: Location) => {
    updateState({ destination: location });
  };

  /**
   * Cleanup function to be called when component unmounts
   */
  const cleanup = () => {
    stopWatchPosition();
  };

  return {
    currLocation,
    destination,
    coordinate,
    time,
    distance,
    isLoading: state.isLoading,
    getCurrentLocation,
    startWatchPosition,
    stopWatchPosition,
    fetchTime,
    setDestination,
    cleanup,
  };
};
