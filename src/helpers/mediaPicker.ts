import ImageCropPicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import {
  requestCameraPermission,
  requestDocumentPermission,
  requestGalleryPermission,
} from './permission';
import { DocumentPickerResponse, pick } from '@react-native-documents/picker';
import { Alert } from 'react-native';

/**
 * Error response for media picker operations
 */
export interface MediaPickerError {
  success: false;
  error: string;
}

/**
 * Success response for media picker operations
 */
export interface MediaPickerSuccess<T> {
  success: true;
  data: T;
}

/**
 * Response type for media picker operations
 */
export type MediaPickerResponse<T> =
  | MediaPickerSuccess<T>
  | MediaPickerError
  | null;

/**
 * Pick single or multiple images from gallery
 * @param allowMultiple - Whether to allow multiple image selection
 * @returns Promise resolving to selected image(s) or null if cancelled/failed
 */
export const pickImagesFromGallery = async (
  allowMultiple: boolean = false,
): Promise<MediaPickerResponse<ImageOrVideo[] | ImageOrVideo>> => {
  try {
    const hasGalleryPermission = await requestGalleryPermission();
    if (!hasGalleryPermission) {
      console.warn('Gallery permission not granted');
      return {
        success: false,
        error: 'Gallery permission not granted',
      };
    }

    if (allowMultiple) {
      const result = await ImageCropPicker.openPicker({
        multiple: true,
        mediaType: 'photo',
        cropping: false,
      });
      return {
        success: true,
        data: result,
      };
    } else {
      const result = await ImageCropPicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      });
      return {
        success: true,
        data: result,
      };
    }
  } catch (error: any) {
    // Don't show alert for user cancellation
    if (error.code !== 'E_PICKER_CANCELLED') {
      console.warn('Image picking failed:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
    return {
      success: false,
      error: error?.message || 'Image picking cancelled or failed',
    };
  }
};

/**
 * Open camera to capture an image
 * @returns Promise resolving to captured image or null if cancelled/failed
 */
export const openCameraForImage = async (): Promise<
  MediaPickerResponse<ImageOrVideo>
> => {
  try {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      console.warn('Camera permission not granted');
      return {
        success: false,
        error: 'Camera permission not granted',
      };
    }

    const image = await ImageCropPicker.openCamera({
      mediaType: 'photo',
      cropping: true,
      width: 1200,
      height: 1200,
      compressImageQuality: 0.8,
    });

    return {
      success: true,
      data: image,
    };
  } catch (error: any) {
    // Don't show alert for user cancellation
    if (error.code !== 'E_PICKER_CANCELLED') {
      console.warn('Image capture failed:', error);
      Alert.alert('Error', 'Failed to capture image. Please try again.');
    }
    return {
      success: false,
      error: error?.message || 'Image capture cancelled or failed',
    };
  }
};

/**
 * Open camera to capture a video
 * @returns Promise resolving to captured video or null if cancelled/failed
 */
export const openCameraForVideo = async (): Promise<
  MediaPickerResponse<ImageOrVideo>
> => {
  try {
    const hasPermission = await requestCameraPermission();

    if (!hasPermission) {
      console.warn('Camera permission not granted');
      return {
        success: false,
        error: 'Camera permission not granted',
      };
    }

    const video = await ImageCropPicker.openCamera({
      mediaType: 'video',
    });

    return {
      success: true,
      data: video,
    };
  } catch (error: any) {
    // Don't show alert for user cancellation
    if (error.code !== 'E_PICKER_CANCELLED') {
      console.warn('Video capture failed:', error);
      Alert.alert('Error', 'Failed to capture video. Please try again.');
    }
    return {
      success: false,
      error: error?.message || 'Video capture cancelled or failed',
    };
  }
};

/**
 * Document result from document picker
 * Matches the structure of DocumentPickerResponse from @react-native-documents/picker
 */
export interface DocumentResult {
  uri: string;
  type: string;
  name: string;
  size: number;
  fileCopyUri?: string; // Made optional as it may not be present in all responses
}

/**
 * Pick single or multiple documents from device
 * @param allowMultiple - Whether to allow multiple document selection
 * @param documentTypes - Optional array of document MIME types to filter by
 * @returns Promise resolving to selected document(s) or null if cancelled/failed
 */
export const pickDocuments = async (
  allowMultiple: boolean = true,
  documentTypes?: string[],
): Promise<
  MediaPickerResponse<DocumentPickerResponse[] | DocumentPickerResponse>
> => {
  try {
    const hasPermission = await requestDocumentPermission();
    if (!hasPermission) {
      console.warn('Document permission not granted');
      return {
        success: false,
        error: 'Document permission not granted',
      };
    }

    const defaultTypes = [
      'application/pdf',
      'application/msword', // .doc
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/vnd.ms-excel', // .xls
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    ];

    const result = await pick({
      mode: 'open',
      allowMultiSelection: allowMultiple,
      type: documentTypes || defaultTypes,
    });

    return {
      success: true,
      data: result,
    };
  } catch (error: any) {
    // Don't show alert for user cancellation
    if (error.code !== 'DOCUMENT_PICKER_CANCELED') {
      console.warn('Document picking failed:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
    return {
      success: false,
      error: error?.message || 'Document picking cancelled or failed',
    };
  }
};
