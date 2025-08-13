import { useState } from 'react';

import { messageData } from '../data';
import { Message } from '../types';
import { pickImagesFromGallery } from '@src/helpers/mediaPicker';
import { Platform } from 'react-native';

export interface User {
  _id: string;
  name: string;
  avatar: string;
}

export interface ConversationItem {
  id?: string;
  [key: string]: any;
}

export const useConversation = (_item: ConversationItem) => {
  // Replace with your actual current user ID
  const currentUserId = 'current-user-id';

  // Mock messages data - replace with your actual messages state management
  const [messages, setMessages] = useState<Message[]>(messageData);

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

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage('');
  };

  const [inputMessage, setInputMessage] = useState<string>('');

  // Function to handle text input changes
  const handleTextChange = (text: string): void => {
    setInputMessage(text);
  };

  const trimmedLength = inputMessage.trim().length;
  const isSendDisabled = trimmedLength === 0;

  // Function to handle attaching images
  const handleAttach = async () => {
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
    messages,
    currentUserId,
    handleSendMessage,
    inputMessage,
    handleTextChange,
    handleAttach,
    isSendDisabled,
  };
};
