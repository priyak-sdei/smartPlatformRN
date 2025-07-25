import { useState } from 'react';

import { messageData } from '../data';
import { Message } from '../types/components';

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
    const newMessage: Message = {
      _id: Date.now().toString(),
      text: messageText,
      createdAt: new Date(),
      user: {
        _id: currentUserId,
        name: 'You',
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      },
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  return {
    messages,
    currentUserId,
    handleSendMessage,
  };
};
