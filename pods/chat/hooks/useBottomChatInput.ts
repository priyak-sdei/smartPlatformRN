import { pickImagesFromGallery } from '@src/helpers/mediaPicker';
import { useState } from 'react';
import { Platform } from 'react-native';

// Bottom chat input hooks
export const useBottomChatInput = (
  onSendMessage: (message: string) => void,
  maxLength: number,
) => {
  const [inputMessage, setInputMessage] = useState<string>('');
  // Function to handle sending messages
  const handleSend = (): void => {
    const trimmedMessage = inputMessage.trim();
    if (trimmedMessage.length > 0) {
      onSendMessage(trimmedMessage);
      setInputMessage('');
    }
  };

  // Function to handle text input changes
  const handleTextChange = (text: string): void => {
    if (text.length <= maxLength) {
      setInputMessage(text);
    }
  };

  const trimmedLength = inputMessage.trim().length;
  const isSendDisabled = trimmedLength === 0 || trimmedLength > maxLength;

  // Function to handle attaching images
  const handleAttach = async () => {
    const images = await pickImagesFromGallery();

    if (images?.success && images.data) {
      console.log('images', images);
      let imagePath;
      if (Array.isArray(images.data)) {
        imagePath =
          Platform.OS === 'ios'
            ? images.data[0]?.sourceURL
            : images.data[0]?.path;
      } else {
        imagePath =
          Platform.OS === 'ios' ? images.data?.sourceURL : images.data?.path;
      }

      if (imagePath) {
        onSendMessage(imagePath); // Send image path
      } else {
        // Optionally, handle the case where no image is selected (e.g., show a message or do nothing)
        // For now, do nothing if no image path is found
      }
    }
  };
  return {
    inputMessage,
    handleSend,
    handleTextChange,
    handleAttach,
    isSendDisabled,
  };
};
