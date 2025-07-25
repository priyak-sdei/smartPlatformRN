import { Alert, Platform } from 'react-native';
import {
  check,
  request,
  Permission,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

/**
 * Possible permission statuses returned by the permission request
 */
export type PermissionStatus =
  | 'unavailable'
  | 'denied'
  | 'limited'
  | 'granted'
  | 'blocked';

/**
 * Get the correct location permission type based on platform
 * @returns The platform-specific location permission
 */
const getLocationPermissionType = (): Permission => {
  return Platform.OS === 'android'
    ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
};

/**
 * Request location permission from the user
 * @returns Promise resolving to boolean indicating if permission was granted
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  const permission = getLocationPermissionType();
  try {
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('Location services are not available on this device');
        Alert.alert(
          'Location Unavailable',
          'Location services are not available on this device',
        );
        return false;

      case RESULTS.DENIED: {
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
      }

      case RESULTS.GRANTED:
        return true;

      case RESULTS.LIMITED:
        console.log('Location permission is limited');
        Alert.alert(
          'Limited Access',
          'Location permission is limited. Some features may not work properly.',
        );
        return true;

      case RESULTS.BLOCKED:
        console.log(
          'Location permission is blocked. Please enable it from settings.',
        );
        Alert.alert(
          'Permission Required',
          'Location permission is blocked. Please enable it from settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ],
        );
        return false;

      default:
        return false;
    }
  } catch (error) {
    console.error('Error requesting location permission:', error);
  }

  return false;
};
/**
 * Get the correct camera permission type based on platform
 * @returns The platform-specific camera permission
 */
export const getCameraPermissionType = (): Permission => {
  return Platform.OS === 'ios'
    ? PERMISSIONS.IOS.CAMERA
    : PERMISSIONS.ANDROID.CAMERA;
};
/**
 * Request camera permission from the user
 * @returns Promise resolving to boolean indicating if permission was granted
 */
export const requestCameraPermission = async (): Promise<boolean> => {
  const permission = getCameraPermissionType();
  try {
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Camera Unavailable',
          'Camera is not available on this device',
        );
        return false;

      case RESULTS.DENIED: {
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
      }

      case RESULTS.GRANTED:
        return true;

      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Required',
          'Camera permission is blocked. Please enable it from settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ],
        );
        return false;

      case RESULTS.LIMITED:
        Alert.alert(
          'Limited Access',
          'Camera permission is limited. Some features may not work properly.',
        );
        return false;

      default:
        return false;
    }
  } catch (error) {
    if (__DEV__) console.log('Error requesting camera permission:', error);
    return false;
  }
};
/**
 * Get the correct gallery permission type based on platform
 * @returns The platform-specific gallery permission
 */
const getGalleryPermissionType = (): Permission => {
  if (Platform.OS === 'android') {
    return PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
  } else {
    return PERMISSIONS.IOS.PHOTO_LIBRARY;
  }
};
/**
 * Request gallery permission from the user
 * @returns Promise resolving to boolean indicating if permission was granted
 */
export const requestGalleryPermission = async (): Promise<boolean> => {
  const permission = getGalleryPermissionType();

  try {
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Gallery Unavailable',
          'Gallery access is not available on this device',
        );
        return false;

      case RESULTS.DENIED: {
        const requestResult = await request(permission);
        return (
          requestResult === RESULTS.GRANTED || requestResult === RESULTS.LIMITED
        );
      }

      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        return true;

      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Required',
          'Gallery access is blocked. Please enable it from settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ],
        );
        return false;

      default:
        return false;
    }
  } catch (error) {
    if (__DEV__) console.log('Error requesting gallery permission:', error);
    return false;
  }
};

/**
 * Get the correct document permission type based on platform and Android version
 * @returns The platform-specific document permission
 */
export const getDocumentPermissionType = (): Permission => {
  if (Platform.OS === 'android') {
    return Platform.Version >= 33
      ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
      : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  }

  return PERMISSIONS.IOS.MEDIA_LIBRARY;
};

/**
 * Request document permission from the user
 * @returns Promise resolving to boolean indicating if permission was granted
 */
export const requestDocumentPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return true;
  }
  const permission = await getDocumentPermissionType();

  try {
    const result = await check(permission);

    switch (result) {
      case RESULTS.UNAVAILABLE:
        Alert.alert(
          'Document Access Unavailable',
          'Document access is not available on this device',
        );
        return false;

      case RESULTS.DENIED: {
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
      }

      case RESULTS.GRANTED:
        return true;

      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Required',
          'Document access is blocked. Please enable it from settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => openSettings() },
          ],
        );
        return false;

      case RESULTS.LIMITED:
        Alert.alert(
          'Limited Access',
          'Document access is limited. Some features may not work properly.',
        );
        return false;

      default:
        return false;
    }
  } catch (error) {
    if (__DEV__) console.log('Error requesting document permission:', error);
    return false;
  }
};
