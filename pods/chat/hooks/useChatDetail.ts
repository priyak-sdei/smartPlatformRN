import { useState } from 'react';

import { messageData } from '../data';
import { Message } from '../types';
import { pickImagesFromGallery } from '@src/helpers/mediaPicker';
import { Platform } from 'react-native';

export interface ConversationItem {
  id?: string;
  [key: string]: any;
}

export const useChatDetail = (_item: ConversationItem) => {
  // Replace with your actual current user ID
  const currentUserId = 'current-user-id';

  // Mock messages data - replace with your actual messages state management
  const [chatMessages, setChatMessages] = useState<Message[]>(messageData);
  const [inputMessage, setInputMessage] = useState<string>('');
  const trimmedLength = inputMessage.trim().length;
  const isSendDisabled = trimmedLength === 0;

  // Function to handle text input changes
  const handleChangeMessageText = (messageText: string): void => {
    setInputMessage(messageText);
  };

  // Function to handle sending messages
  const handleSendMessage = (messageText: string): void => {
    const trimmedMessage = messageText?.trim();
    if (trimmedMessage.length === 0) return;

    const newMessage: Message = {
      _id: Date.now().toString(),
      text: trimmedMessage,
      createdAt: new Date(),
      user: {
        _id: currentUserId,
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
    };

    setChatMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
  };

  // Function to handle attaching images
  const handleAttachImages = async () => {
    const images = await pickImagesFromGallery();

    if (images?.success && images.data) {
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
        handleSendMessage(imagePath);
      }
    }
  };

  return {
    chatMessages,
    currentUserId,
    inputMessage,
    isSendDisabled,
    handleSendMessage,
    handleChangeMessageText,
    handleAttachImages,
  };
};
